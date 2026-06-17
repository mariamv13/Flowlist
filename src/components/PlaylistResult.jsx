import { useState } from 'react'
import { Bookmark, Share2, Check } from 'lucide-react'
import TrackCard from './TrackCard'

function PlaylistResult({ tracks, mood, genre, onSave }) {
  const [copied, setCopied] = useState(false)

  if (!tracks || tracks.length === 0) return null

  const handleShare = async () => {
    const header = `🎵 Mi playlist Flowlist — ${mood} · ${genre}\n\n`
    const list = tracks
      .map((track, i) => `${i + 1}. ${track.name} — ${track.artist}`)
      .join('\n')

    const text = header + list

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="playlist-result">
      <div className="playlist-header">
        <h2 className="playlist-title">Tu playlist</h2>
        <div className="playlist-subtitle-row">
          <p className="playlist-subtitle">
            {tracks.length} canciones para tu momento <strong>{mood}</strong> de <strong>{genre}</strong>
          </p>
          <div className="playlist-actions">
            <button className="action-btn" onClick={onSave}>
              <Bookmark size={16} />
              Guardar
            </button>
            <button className="action-btn" onClick={handleShare}>
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? 'Copiado' : 'Compartir'}
            </button>
          </div>
        </div>
      </div>
      <div className="track-list">
        {tracks.map((track, index) => (
          <TrackCard key={`${track.name}-${index}`} track={track} index={index} />
        ))}
      </div>
    </div>
  )
}

export default PlaylistResult