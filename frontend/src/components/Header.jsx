import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
        <nav>
            <Link to="/">Songs</Link>
            <Link to="/add-song">Add Song</Link>
            <Link to="/playlists">Playlists</Link>
            <Link to="/add-playlist">Add Playlist</Link>
        </nav>
        </header>
    )
}

export default Header