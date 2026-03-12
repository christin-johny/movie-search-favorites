import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"
import { getFavorites, addFavorite as apiAddFavorite, removeFavorite as apiRemoveFavorite } from "../services/api"
import type { Movie } from "../types/movie"

interface FavoritesContextType {
  favorites: Movie[]
  isLoading: boolean
  isFavorite: (imdbID: string) => boolean
  addFavorite: (movie: Movie) => Promise<void>
  removeFavorite: (imdbID: string) => Promise<void>
  loadMoreFavorites: () => Promise<void>
  hasMoreFavorites: boolean
  totalFavorites: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMoreFavorites, setHasMoreFavorites] = useState(false)
  const [totalFavorites, setTotalFavorites] = useState(0)

  const fetchFavorites = useCallback(async (pageNum = 1) => {
    try {
      if (pageNum === 1) setIsLoading(true)
      const res = await getFavorites(pageNum, 10) // 10 per page
      const newFavorites = res.data.data || []
      const total = res.data.totalResults || 0
      
      setFavorites(prev => pageNum === 1 ? newFavorites : [...prev, ...newFavorites])
      setTotalFavorites(total)
      setHasMoreFavorites(pageNum < (res.data.totalPages || 1))
      setPage(pageNum)
    } catch (error) {
      console.error("Failed to fetch favorites", error)
    } finally {
      if (pageNum === 1) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFavorites(1)
  }, [fetchFavorites])

  const loadMoreFavorites = async () => {
    if (!hasMoreFavorites || isLoading) return
    await fetchFavorites(page + 1)
  }

  const isFavorite = useCallback((imdbID: string) => {
    return favorites.some((movie) => movie.imdbID === imdbID)
  }, [favorites])

  const addFavorite = async (movie: Movie) => {
    try {
      setFavorites(prev => [...prev, movie])
      setTotalFavorites(prev => prev + 1)
      await apiAddFavorite(movie)
    } catch (error) {
      console.error("Failed to add favorite", error)
      setFavorites(prev => prev.filter(m => m.imdbID !== movie.imdbID))
      setTotalFavorites(prev => prev - 1)
    }
  }

  const removeFavorite = async (imdbID: string) => {
    try {
      const removedMovie = favorites.find(m => m.imdbID === imdbID)
      if (!removedMovie) return

      setFavorites(prev => prev.filter(m => m.imdbID !== imdbID))
      setTotalFavorites(prev => prev - 1)
      await apiRemoveFavorite(imdbID)
      
      // Instead of completely refetching from page 1, we optimistically updated.
      // But if we're now low on items and there are more on the server, we might want to fetch.
      // Easiest robust solution for a paginated list on delete is to refetch current pages.
      // To keep it simple and performant, we just rely on the optimistic update.
      // If the user navigates away and back, it will refresh.
    } catch (error) {
      console.error("Failed to remove favorite", error)
      fetchFavorites(1) // Re-sync from page 1 on error
    }
  }

  return (
    <FavoritesContext.Provider value={{ 
      favorites, isLoading, isFavorite, addFavorite, removeFavorite, 
      loadMoreFavorites, hasMoreFavorites, totalFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
