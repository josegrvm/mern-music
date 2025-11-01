import { useContext } from 'react'
import { SongsContext } from '../context/SongsContext'

const SongsList = () => {
    const { songs } = useContext(SongsContext)

    return (
        <div>
        <h1>All Songs</h1>
        {songs.length === 0 ? (
            <p>No songs found. Add one!</p>
        ) : (
            <ul>
            {songs.map((song) => (
                <li key={song._id}>
                <strong>{song.title}</strong> — {song.artist} ({song.genre})
                </li>
            ))}
            </ul>
        )}
        </div>
    )
}

export default SongsList