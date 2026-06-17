import { useState, useEffect } from 'react'
import axios from 'axios'
import MoodForm from './components/MoodForm'
import PlaylistResult from './components/PlaylistResult'
import SavedPlaylists from './components/SavedPlaylists'
import logo from './assets/logo-flowlist.svg'
import './App.css'

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
const STORAGE_KEY = 'flowlist_saved_playlists'

const ERA_TAGS = {
  any: '',
  '70s': '70s',
  '90s': '90s',
  '2000s': '2000s',
  current: '2020s',
}

function App() {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastSelection, setLastSelection] = useState(null)
  const [savedPlaylists, setSavedPlaylists] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setSavedPlaylists(JSON.parse(stored))
    }
  }, [])

  const limitArtistRepeats = (rawTracks, maxPerArtist = 2) => {
    const counts = {}
    return rawTracks.filter(track => {
      const artistName = track.artist?.name || track.artist
      counts[artistName] = (counts[artistName] || 0) + 1
      return counts[artistName] <= maxPerArtist
    })
  }

  const formatTracks = async (rawTracks) => {
  const tracksWithImages = await Promise.all(
    rawTracks.map(async (track) => {
      const artistName = track.artist?.name || track.artist
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(artistName + ' ' + track.name)}`

      try {
        const res = await axios.get(BASE_URL, {
          params: {
            method: 'track.getInfo',
            artist: artistName,
            track: track.name,
            api_key: API_KEY,
            format: 'json',
          }
        })
        const image = res.data?.track?.album?.image?.find(img => img.size === 'medium')?.['#text'] || null
        return {
          name: track.name,
          artist: artistName,
          url: youtubeUrl,
          image: image || null,
        }
      } catch {
        return {
          name: track.name,
          artist: artistName,
          url: youtubeUrl,
          image: null,
        }
      }
    })
  )
  return tracksWithImages
}

  const generatePlaylist = async ({ mood, genre, era }) => {
    setLoading(true)
    setError(null)
    setLastSelection({ mood, genre, era })

    const moodTag = mood
    const eraTag = ERA_TAGS[era]
    const tag = eraTag ? `${genre} ${eraTag}` : `${genre} ${moodTag}`

    try {
      const res = await axios.get(BASE_URL, {
        params: {
          method: 'tag.gettoptracks',
          tag,
          api_key: API_KEY,
          format: 'json',
          limit: 40,
        }
      })

      let rawTracks = res.data?.tracks?.track || []

      if (rawTracks.length === 0) {
        const fallbackRes = await axios.get(BASE_URL, {
          params: {
            method: 'tag.gettoptracks',
            tag: genre,
            api_key: API_KEY,
            format: 'json',
            limit: 40,
          }
        })
        rawTracks = fallbackRes.data?.tracks?.track || []
      }

      const filteredTracks = limitArtistRepeats(rawTracks).slice(0, 20)
      setTracks(await formatTracks(filteredTracks))

    } catch (err) {
      console.error('Error al generar playlist:', err)
      setError('No se pudo generar la playlist. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const savePlaylist = () => {
    if (tracks.length === 0) return

    const name = `${lastSelection?.mood} · ${lastSelection?.genre}`
    const newPlaylist = {
      id: Date.now(),
      name,
      tracks,
      mood: lastSelection?.mood,
      genre: lastSelection?.genre,
    }

    const updated = [newPlaylist, ...savedPlaylists]
    setSavedPlaylists(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const loadPlaylist = (playlist) => {
    setTracks(playlist.tracks)
    setLastSelection({ mood: playlist.mood, genre: playlist.genre })
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const deletePlaylist = (id) => {
    const updated = savedPlaylists.filter(p => p.id !== id)
    setSavedPlaylists(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Flowlist" className="app-logo" />
        <p className="app-subtitle">Genera una playlist según tu estado de ánimo</p>
      </header>
      <main className="app-main">
        <MoodForm onGenerate={generatePlaylist} loading={loading} />
        {error && <p className="error-msg">{error}</p>}
        {tracks.length > 0 && (
          <PlaylistResult
            tracks={tracks}
            mood={lastSelection?.mood}
            genre={lastSelection?.genre}
            onSave={savePlaylist}
          />
        )}
        <SavedPlaylists
          playlists={savedPlaylists}
          onLoad={loadPlaylist}
          onDelete={deletePlaylist}
        />
      </main>
    </div>
  )
}

export default App