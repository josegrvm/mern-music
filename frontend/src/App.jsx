import { Routes, Route } from 'react-router-dom'
import { SongsProvider } from './context/SongsContext'
import Header from './components/Header'
import SongsList from './components/SongList'
import AddSong from './components/AddSong'
import Playlists from './components/Playlists'
import AddPlaylist from './components/AddPlaylist'
import './App.css'

function App() {
  return (
    <SongsProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SongsList />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/add-playlist" element={<AddPlaylist />} />
        </Routes>
      </main>
    </SongsProvider>
  )
}

export default App