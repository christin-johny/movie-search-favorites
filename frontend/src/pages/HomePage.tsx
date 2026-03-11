import { useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { searchMovies } from "../services/api"
import type { Movie } from "../types/movie"

const HomePage = () => {

  const [movies, setMovies] = useState<Movie[]>([])

  const handleSearch = async (query: string) => {
  try {

    const res = await searchMovies(query)

    setMovies(res.data.data.Search || [])

  } catch (error) {

    console.error("Search failed:", error)
    setMovies([])

  }
}

  return (
    <div>

      <h1>Movie Search</h1>

      <SearchBar onSearch={handleSearch} />

      <div>

        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie}/>
        ))}

      </div>

    </div>
  )
}

export default HomePage