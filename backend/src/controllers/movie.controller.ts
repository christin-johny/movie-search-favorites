import { Request, Response } from "express"
import axios from "axios"
import { readFavorites, writeFavorites } from "../utils/storage"
import { Movie } from "../types/movie.types"

export const searchMovies = async (req: Request, res: Response) => {

  try {

    const { q, page = 1 } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      })
    }

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${q}&page=${page}`
    )

    res.json({
      success: true,
      data: response.data
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch movies"
    })

  }

}

export const getFavorites = (req: Request, res: Response) => {
  const favorites = readFavorites()

  res.json({
    success: true,
    data: favorites
  })
}

export const addFavorite = (req: Request, res: Response) => {
  const movie: Movie = req.body

  const favorites = readFavorites()

  const exists = favorites.find(f => f.imdbID === movie.imdbID)

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Movie already in favorites"
    })
  }

  favorites.push(movie)

  writeFavorites(favorites)

  res.json({
    success: true,
    message: "Movie added to favorites"
  })
}

export const removeFavorite = (req: Request, res: Response) => {
  const { id } = req.params

  let favorites = readFavorites()

  favorites = favorites.filter(movie => movie.imdbID !== id)

  writeFavorites(favorites)

  res.json({
    success: true,
    message: "Movie removed from favorites"
  })
}