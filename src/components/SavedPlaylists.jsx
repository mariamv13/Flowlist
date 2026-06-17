function SavedPlaylists({ playlists, onLoad, onDelete }) {
  if (playlists.length === 0) return null

  return (
    <div className="saved-section">
      <h2 className="saved-title">Playlists guardadas</h2>
      <div className="saved-list">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="saved-card">
            <div className="saved-info" onClick={() => onLoad(playlist)}>
              <span className="saved-name">{playlist.name}</span>
              <span className="saved-meta">{playlist.tracks.length} canciones</span>
            </div>
            <button
              className="saved-delete"
              onClick={() => onDelete(playlist.id)}
              title="Eliminar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPlaylists