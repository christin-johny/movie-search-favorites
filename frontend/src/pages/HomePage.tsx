import { useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { searchMovies } from "../services/api"
import type { Movie } from "../types/movie"

const HomePage = () => {

  const [movies, setMovies] = useState<Movie[]>([])

  const handleSearch = async (query: string) => {

  if (!query) {
    setMovies([])
    return
  }

  try {

    const res = await searchMovies(query)

    setMovies(res.data.data.movies || [])

  } catch (error) {

    console.error(error)
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