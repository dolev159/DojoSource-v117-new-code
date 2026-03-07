import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { dataconnect } from './lib/firebase'
import { listMovies } from '@dataconnect/generated'

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await listMovies(dataconnect)
        setMovies(response.data.movies)
      } catch (err) {
        console.error('Failed to fetch movies:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Data Connect</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="movies-section">
        <h2>Movies from Data Connect</h2>
        {loading && <p>Loading movies...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <div className="movie-list">
            {movies.length === 0 ? (
              <p>No movies found. Make sure the emulator is running and has data.</p>
            ) : (
              <ul>
                {movies.map(movie => (
                  <li key={movie.id}>
                    <strong>{movie.title}</strong> - {movie.genre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
