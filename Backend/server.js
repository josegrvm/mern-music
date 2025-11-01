import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import songRoutes from './routes/songs.js'
import playlistRoutes from './routes/ playlists.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('🎵 MERN Music API is running!')
})

app.use('/api/songs', songRoutes)
app.use('/api/playlists', playlistRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
