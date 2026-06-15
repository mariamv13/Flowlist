import { useState } from 'react'

const MOODS = [
  { value: 'happy', label: '😊 Feliz', tag: 'happy' },
  { value: 'melancholic', label: '😔 Melancólico', tag: 'melancholic' },
  { value: 'energetic', label: '⚡ Energético', tag: 'energetic' },
  { value: 'relaxed', label: '😌 Relajado', tag: 'chill' },
  { value: 'romantic', label: '❤️ Romántico', tag: 'romantic' },
  { value: 'sad', label: '😢 Triste', tag: 'sad' },
  { value: 'angry', label: '😤 Enfadado', tag: 'angry' },
  { value: 'nostalgic', label: '🌅 Nostálgico', tag: 'nostalgic' },
  { value: 'motivated', label: '💪 Motivado', tag: 'motivational' },
  { value: 'dreamy', label: '🌙 Soñador', tag: 'dreamy' },
  { value: 'party', label: '🎉 Fiesta', tag: 'party' },
  { value: 'focus', label: '🎯 Concentrado', tag: 'focus' },
]

const GENRES = [
  { value: 'pop', label: 'Pop' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'electronic', label: 'Electrónica' },
  { value: 'indie', label: 'Indie' },
  { value: 'hip-hop', label: 'Hip-Hop' },
  { value: 'classical', label: 'Clásica' },
  { value: 'rnb', label: 'R&B' },
  { value: 'metal', label: 'Metal' },
  { value: 'punk', label: 'Punk' },
  { value: 'folk', label: 'Folk' },
  { value: 'soul', label: 'Soul' },
  { value: 'reggae', label: 'Reggae' },
  { value: 'blues', label: 'Blues' },
  { value: 'latin', label: 'Latin' },
  { value: 'country', label: 'Country' },
  { value: 'alternative', label: 'Alternativo' },
  { value: 'disco', label: 'Disco' },
]

const ERAS = [
  { value: 'any', label: 'Cualquier época' },
  { value: '70s', label: '70s — 80s' },
  { value: '90s', label: '90s — 00s' },
  { value: 'current', label: 'Actual' },
]

function MoodForm({ onGenerate, loading }) {
  const [mood, setMood] = useState('happy')
  const [genre, setGenre] = useState('pop')
  const [era, setEra] = useState('any')

  return (
    <div className="mood-form">
      <div className="form-group">
        <label>¿Cómo te sientes?</label>
        <div className="option-grid">
          {MOODS.map(m => (
            <button
              key={m.value}
              className={`option-btn ${mood === m.value ? 'active' : ''}`}
              onClick={() => setMood(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Género musical</label>
        <div className="option-grid">
          {GENRES.map(g => (
            <button
              key={g.value}
              className={`option-btn ${genre === g.value ? 'active' : ''}`}
              onClick={() => setGenre(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Época</label>
        <div className="option-grid">
          {ERAS.map(e => (
            <button
              key={e.value}
              className={`option-btn ${era === e.value ? 'active' : ''}`}
              onClick={() => setEra(e.value)}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="generate-btn"
        onClick={() => onGenerate({ mood, genre, era })}
        disabled={loading}
      >
        {loading ? 'Generando...' : '🎵 Generar playlist'}
      </button>
    </div>
  )
}

export default MoodForm