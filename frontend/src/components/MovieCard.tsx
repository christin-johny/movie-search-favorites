import type { Movie } from "../types/movie"

interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {

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