import { createContext, useState, useEffect } from 'react'
import API from '../services/api'

export const SongsContext = createContext()

export const SongsProvider = ({ children }) => {
    const [songs, setSongs] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)

    // 🔁 Obtener canciones y playlists desde el backend
    useEffect(() => {
        const fetchData = async () => {
        try {
            const [songsRes, playlistsRes] = await Promise.all([
            API.get('/songs'),
            API.get('/playlists'),
            ])
            setSongs(songsRes.data)
            setPlaylists(playlistsRes.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
        }
        fetchData()
    }, [])

    // 🎶 Agregar una canción
    const addSong = async (newSong) => {
        try {
        const res = await API.post('/songs', newSong)
        setSongs([...songs, res.data])
        } catch (error) {
        console.error('Error adding song:', error)
        }
    }

    // 🎧 Crear playlist
    const addPlaylist = async (newPlaylist) => {
        try {
        const res = await API.post('/playlists', newPlaylist)
        setPlaylists([...playlists, res.data])
        } catch (error) {
        console.error('Error creating playlist:', error)
        }
    }

    // ✏️ Editar nombre
    const editPlaylistName = async (id, newName) => {
        try {
        const res = await API.put(`/playlists/${id}`, { name: newName })
        setPlaylists(playlists.map((p) => (p._id === id ? res.data : p)))
        } catch (error) {
        console.error('Error editing playlist:', error)
        }
    }

    // 🗑️ Eliminar playlist
    const deletePlaylist = async (id) => {
        try {
        await API.delete(`/playlists/${id}`)
        setPlaylists(playlists.filter((p) => p._id !== id))
        } catch (error) {
        console.error('Error deleting playlist:', error)
        }
    }

    // ❌ Quitar canción de playlist
    const removeSongFromPlaylist = async (playlistId, songId) => {
        try {
        const playlist = playlists.find((p) => p._id === playlistId)
        const updatedSongs = playlist.songs.filter((s) => s._id !== songId)
        const res = await API.put(`/playlists/${playlistId}`, {
            songs: updatedSongs.map((s) => s._id),
        })
        setPlaylists(playlists.map((p) => (p._id === playlistId ? res.data : p)))
        } catch (error) {
        console.error('Error removing song from playlist:', error)
        }
    }

    const contextValue = {
        songs,
        playlists,
        addSong,
        addPlaylist,
        editPlaylistName,
        deletePlaylist,
        removeSongFromPlaylist,
        loading,
    }

    return (
        <SongsContext.Provider value={contextValue}>
        {loading ? <p>Loading...</p> : children}
        </SongsContext.Provider>
    )
}