import { useContext, useState } from 'react'
import { SongsContext } from '../context/SongsContext'
import { Link } from 'react-router-dom'

const Playlists = () => {
    const { playlists, editPlaylistName, deletePlaylist, removeSongFromPlaylist } =
        useContext(SongsContext)
    const [editingId, setEditingId] = useState(null)
    const [newName, setNewName] = useState('')

    if (playlists.length === 0) {
        return (
        <div>
            <h1>Your Playlists</h1>
            <p>No playlists yet 😢</p>
            <Link to="/add-playlist" className="add-link">
            ➕ Create your first playlist
            </Link>
        </div>
        )
    }

    return (
        <div>
        <h1>Your Playlists</h1>
        <Link to="/add-playlist" className="add-link">
            ➕ Add New Playlist
        </Link>

        <ul className="playlist-list">
            {playlists.map((playlist) => (
            <li key={playlist._id} className="playlist-item">
                {editingId === playlist._id ? (
                <div>
                    <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    />
                    <button
                    onClick={() => {
                        editPlaylistName(playlist._id, newName)
                        setEditingId(null)
                    }}
                    >
                    Save
                    </button>
                </div>
                ) : (
                <h3>{playlist.name}</h3>
                )}

                <ul>
                {playlist.songs.length > 0 ? (
                    playlist.songs.map((song) => (
                    <li key={song._id}>
                        {song.title} — {song.artist}
                        <button
                        onClick={() =>
                            removeSongFromPlaylist(playlist._id, song._id)
                        }
                        >Delete</button>
                    </li>
                    ))
                ) : (
                    <p>No songs in this playlist</p>
                )}
                </ul>

                <button
                onClick={() => {
                    setEditingId(playlist._id)
                    setNewName(playlist.name)
                }}
                >
                Edit
                </button>
                <button onClick={() => deletePlaylist(playlist._id)}>Delete Playlist</button>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default Playlists