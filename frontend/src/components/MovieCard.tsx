import type { Movie } from "../types/movie"

interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {

  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} width="150"/>

      <h3>{movie.Title}</h3>

      <p>{movie.Year}</p>

    </div>
  )
}

export default MovieCard