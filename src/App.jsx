import { useState } from 'react'
import axios from 'axios'
import MoodForm from './components/MoodForm'
import PlaylistResult from './components/PlaylistResult'
import logo from './assets/logo-flowlist.svg'
import './App.css'

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'

const ERA_TAGS = {
  any: '',
  '70s': '70s',
  '90s': '90s',
  current: '2020s',
}

function App() {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastSelection, setLastSelection] = useState(null)

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
          limit: 20,
        }
      })

      const rawTracks = res.data?.tracks?.track || []

      if (rawTracks.length === 0) {
        const fallbackRes = await axios.get(BASE_URL, {
          params: {
            method: 'tag.gettoptracks',
            tag: genre,
            api_key: API_KEY,
            format: 'json',
            limit: 20,
          }
        })
        const fallbackTracks = fallbackRes.data?.tracks?.track || []
        setTracks(formatTracks(fallbackTracks))
      } else {
        setTracks(formatTracks(rawTracks))
      }

    } catch (err) {
      console.error('Error al generar playlist:', err)
      setError('No se pudo generar la playlist. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const formatTracks = (rawTracks) => {
    return rawTracks.map(track => ({
      name: track.name,
      artist: track.artist?.name || track.artist,
      url: track.url,
      image: track.image?.find(img => img.size === 'medium')?.['#text'] || null,
    }))
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
          />
        )}
      </main>
    </div>
  )
}

export default App