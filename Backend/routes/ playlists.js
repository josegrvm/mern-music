import express from 'express'
import {
    getPlaylists,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
} from '../controllers/playlistController.js'

const router = express.Router()

router.get('/', getPlaylists)
router.post('/', createPlaylist)
router.put('/:id', updatePlaylist)
router.delete('/:id', deletePlaylist)

export default router