import Song from '../models/Song.js'

export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find()
        res.json(songs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    }

    export const createSong = async (req, res) => {
    try {
        const newSong = new Song(req.body)
        const savedSong = await newSong.save()
        res.status(201).json(savedSong)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}