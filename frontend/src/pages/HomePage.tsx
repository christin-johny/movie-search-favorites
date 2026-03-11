import { useState, useCallback } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { searchMovies } from "../services/api"
import type { Movie } from "../types/movie"

const HomePage = () => {

  const [movies, setMovies] = useState<Movie[]>([])

  const handleSearch = useCallback(async (query: string) => {

  if (!query.trim()) {
    setMovies([])
    return
  }

  try {

    const res = await searchMovies(query)

    setMovies(res.data.data.Search || [])

  } catch (error) {

    console.error(error)
    setMovies([])

  }
}, [])

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-brand-500 to-indigo-400 bg-clip-text text-transparent pb-2">
            Movie Search
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Discover your favorite movies, explore their details, and find your next watch.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-zinc-500 flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-zinc-900/50 flex items-center justify-center mb-4">
              <svg className="w-12 h-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-xl font-medium text-white/40">No movies found</p>
            <p className="text-md text-zinc-600">Start typing above to search for movies...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage