import { useContext, useState } from 'react'
import { SongsContext } from '../context/SongsContext'
import '../App.css'

const AddPlaylist = () => {
    const { songs, addPlaylist } = useContext(SongsContext)
    const [playlistName, setPlaylistName] = useState('')
    const [selectedSongs, setSelectedSongs] = useState([])
    const [message, setMessage] = useState('')

    const handleSongSelect = (song) => {
        const songId = song._id?.toString()
        if (!songId) return
        if (selectedSongs.includes(songId)) {
        setSelectedSongs(selectedSongs.filter((id) => id !== songId))
        } else {
        setSelectedSongs([...selectedSongs, songId])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!playlistName || selectedSongs.length === 0) {
        setMessage('⚠️ Please enter a name and select at least one song.')
        return
        }
        await addPlaylist({ name: playlistName, songs: selectedSongs })
        setMessage('✅ Playlist created successfully!')
        setPlaylistName('')
        setSelectedSongs([])
    }

    return (
        <div>
        <h1>Create New Playlist</h1>
        <p>Playlist Name:</p>
        <form onSubmit={handleSubmit} className="form-container">
            <input
            type="text"
            placeholder="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            />

            <div className="song-selector">
            <h3>Choose songs:</h3>
            {songs.length > 0 ? (
                songs.map((song) => (
                <label key={song._id} className="checkbox-label">
                    <input
                    type="checkbox"
                    value={song._id}
                    checked={selectedSongs.includes(song._id?.toString())}
                    onChange={() => handleSongSelect(song)}
                    />
                    {song.title} — {song.artist}
                </label>
                ))
            ) : (
                <p>No songs available yet 😢</p>
            )}
            </div>

            <button type="submit">Create Playlist</button>
        </form>

        {message && <p>{message}</p>}
        </div>
    )
}

export default AddPlaylist