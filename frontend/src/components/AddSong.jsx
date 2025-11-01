import { useState, useContext } from 'react'
import { SongsContext } from '../context/SongsContext'

const AddSong = () => {
    const { addSong } = useContext(SongsContext)
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !artist || !genre) {
        setMessage('⚠️ Please fill in all fields')
        return
        }

        await addSong({ title, artist, genre })
        setMessage('✅ Song added successfully!')
        setTitle('')
        setArtist('')
        setGenre('')
    }

    return (
        <div>
        <h1>Add a New Song</h1>
        <form onSubmit={handleSubmit} className="form-container">
            <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            />
            <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            />
            <button type="submit">Add Song</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    )
}

export default AddSong