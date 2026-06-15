import TrackCard from './TrackCard'

function PlaylistResult({ tracks, mood, genre }) {
  if (!tracks || tracks.length === 0) return null

  return (
    <div className="playlist-result">
      <div className="playlist-header">
        <h2 className="playlist-title">Tu playlist</h2>
        <p className="playlist-subtitle">
          {tracks.length} canciones para tu momento <strong>{mood}</strong> de <strong>{genre}</strong>
        </p>
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