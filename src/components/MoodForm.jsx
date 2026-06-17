import { useState } from 'react'

import { Smile, CloudRain, Zap, Coffee, Heart, Frown, Flame, Sunset, Dumbbell, Moon, PartyPopper, Target, Shuffle } from 'lucide-react'

const MOODS = [
  { value: 'happy', label: 'Feliz', icon: Smile, tag: 'happy' },
  { value: 'melancholic', label: 'Melancólico', icon: CloudRain, tag: 'melancholic' },
  { value: 'energetic', label: 'Energético', icon: Zap, tag: 'energetic' },
  { value: 'relaxed', label: 'Relajado', icon: Coffee, tag: 'chill' },
  { value: 'romantic', label: 'Romántico', icon: Heart, tag: 'romantic' },
  { value: 'sad', label: 'Triste', icon: Frown, tag: 'sad' },
  { value: 'angry', label: 'Enfadado', icon: Flame, tag: 'angry' },
  { value: 'nostalgic', label: 'Nostálgico', icon: Sunset, tag: 'nostalgic' },
  { value: 'motivated', label: 'Motivado', icon: Dumbbell, tag: 'motivational' },
  { value: 'dreamy', label: 'Soñador', icon: Moon, tag: 'dreamy' },
  { value: 'party', label: 'Fiesta', icon: PartyPopper, tag: 'party' },
  { value: 'focus', label: 'Concentrado', icon: Target, tag: 'focus' },
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
  { value: '90s', label: '90s' },
  { value: '2000s', label: '2000 — 2018' },
  { value: 'current', label: 'Actual' },
]

function MoodForm({ onGenerate, loading }) {
  const [mood, setMood] = useState('happy')
  const [genre, setGenre] = useState('pop')
  const [era, setEra] = useState('any')

  const handleSurprise = () => {
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)].value
    const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)].value
    const randomEra = ERAS[Math.floor(Math.random() * ERAS.length)].value

    setMood(randomMood)
    setGenre(randomGenre)
    setEra(randomEra)

    onGenerate({ mood: randomMood, genre: randomGenre, era: randomEra })
  }

  return (
    <div className="mood-form">
      <div className="form-group">
        <label>¿Cómo te sientes?</label>
        <div className="option-grid">
          {MOODS.map(m => {
            const Icon = m.icon
            return (
              <button
                key={m.value}
                className={`option-btn ${mood === m.value ? 'active' : ''}`}
                onClick={() => setMood(m.value)}
              >
                <Icon size={16} />
                {m.label}
              </button>
            )
          })}
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

      <div className="form-buttons">
        <button
          className="generate-btn"
          onClick={() => onGenerate({ mood, genre, era })}
          disabled={loading}
        >
          {loading ? 'Generando...' : 'Generar playlist'}
        </button>
        <button
          className="surprise-btn"
          onClick={handleSurprise}
          disabled={loading}
        >
          <Shuffle size={18} />
          Sorpréndeme
        </button>
      </div>
    </div>
  )
}

export default MoodForm