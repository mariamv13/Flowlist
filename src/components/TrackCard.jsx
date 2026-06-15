function TrackCard({ track, index }) {
  return (
    <div className="track-card">
      <span className="track-index">{index + 1}</span>
      <div className="track-image">
        {track.image ? (
          <img src={track.image} alt={track.name} />
        ) : (
          <div className="no-image">🎵</div>
        )}
      </div>
      <div className="track-info">
        <span className="track-name">{track.name}</span>
        <span className="track-artist">{track.artist}</span>
      </div>
      {track.url && (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="track-link"
        >
          ↗
        </a>
      )}
    </div>
  )
}

export default TrackCard