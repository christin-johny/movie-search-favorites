import { useState, useCallback } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { searchMovies } from "../services/api"
import { useFavorites } from "../context/FavoritesContext"
import type { Movie } from "../types/movie"

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [view, setView] = useState<'search' | 'favorites'>('search')
  const [page, setPage] = useState(1)
  const [currentQuery, setCurrentQuery] = useState("")
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  const { favorites, isLoading: isFavoritesLoading, loadMoreFavorites, hasMoreFavorites, totalFavorites } = useFavorites()

  const handleSearch = useCallback(async (query: string, pageNum = 1) => {
    if (!query.trim()) {
      setMovies([])
      setCurrentQuery("")
      return
    }

    try {
      if (pageNum > 1) {
        setIsLoadingMore(true)
      } else {
        setCurrentQuery(query)
      }

      const res = await searchMovies(query, pageNum)
      const newMovies = res.data.data || []

      if (pageNum === 1) {
        setMovies(newMovies)
        setPage(1)
      } else {
        setMovies(prev => [...prev, ...newMovies])
      }

    } catch (error) {
      console.error(error)
      if (pageNum === 1) setMovies([])

    } finally {
      setIsLoadingMore(false)
    }
  }, [])

  const loadMore = () => {
    if (view === 'search') {
      const nextPage = page + 1
      setPage(nextPage)
      handleSearch(currentQuery, nextPage)
    } else {
      setIsLoadingMore(true)
      loadMoreFavorites().finally(() => setIsLoadingMore(false))
    }
  }

  const displayedMovies = view === 'search' ? movies : favorites

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

        <div className="max-w-2xl mx-auto flex flex-col space-y-6">
          <div className="flex justify-center w-full">
            <div className="bg-zinc-900/50 p-1 rounded-xl flex space-x-1 border border-zinc-800 backdrop-blur-sm">
              <button 
                onClick={() => setView('search')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${view === 'search' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                Search
              </button>
              <button 
                onClick={() => setView('favorites')}
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${view === 'favorites' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                <span>Favorites</span>
                {totalFavorites > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${view === 'favorites' ? 'bg-white/20' : 'bg-brand-500/20 text-brand-400'}`}>
                    {totalFavorites}
                  </span>
                )}
              </button>
            </div>
          </div>

          {view === 'search' && (
            <SearchBar onSearch={handleSearch} />
          )}
        </div>

        {view === 'favorites' && isFavoritesLoading && favorites.length === 0 ? (
          <div className="py-24 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
          </div>
        ) : displayedMovies.length > 0 ? (
          <div className="space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayedMovies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie}/>
              ))}
            </div>
            
            {(view === 'search' && displayedMovies.length >= 10 || view === 'favorites' && hasMoreFavorites) && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More Results</span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 text-zinc-500 flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-zinc-900/50 flex items-center justify-center mb-4">
              <svg className="w-12 h-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {view === 'favorites' ? (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                )}
              </svg>
            </div>
            <p className="text-xl font-medium text-white/40">
              {view === 'favorites' ? "No favorites yet" : "No movies found"}
            </p>
            <p className="text-md text-zinc-600">
              {view === 'favorites' ? "Search for a movie and click the heart icon to add it!" : "Start typing above to search for movies..."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage