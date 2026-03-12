import type { Movie } from "../types/movie"
import { useFavorites } from "../context/FavoritesContext"

interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(movie.imdbID)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFavorite(movie.imdbID)
    } else {
      addFavorite(movie)
    }
  }

  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"

  return (
    <div className="glass-panel rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col h-full cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
        <img 
          src={posterSrc} 
          alt={movie.Title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 ${
            favorite 
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
              : 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg 
            className="w-5 h-5" 
            fill={favorite ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10 bg-zinc-900/50">
        <h3 className="font-semibold text-base sm:text-lg leading-tight mb-2 line-clamp-2 text-white group-hover:text-brand-400 transition-colors">
          {movie.Title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between text-xs sm:text-sm text-zinc-400">
          <span className="bg-zinc-800 px-2 py-1 rounded border border-zinc-700/50 shadow-inner group-hover:border-brand-500/30 transition-colors">
            {movie.Year}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard