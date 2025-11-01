import express from 'express'
import { getSongs, createSong } from '../controllers/songController.js'

const router = express.Router()

router.get('/', getSongs)
router.post('/', createSong)

export default router