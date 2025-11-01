import Playlist from '../models/Playlist.js'
import Song from '../models/Song.js'

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs')
    res.json(playlists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createPlaylist = async (req, res) => {
    try {
        const { name, songs } = req.body
        const validSongs = await Song.find({ _id: { $in: songs } })
        const newPlaylist = new Playlist({ name, songs: validSongs })
        const saved = await newPlaylist.save()
        const populated = await saved.populate('songs')
        res.status(201).json(populated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    }

    export const updatePlaylist = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await Playlist.findByIdAndUpdate(id, req.body, {
        new: true,
        }).populate('songs')
        res.json(updated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    }

    export const deletePlaylist = async (req, res) => {
    try {
        await Playlist.findByIdAndDelete(req.params.id)
        res.json({ message: 'Playlist deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}