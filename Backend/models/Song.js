import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
})

export default mongoose.model('Song', songSchema)