import { Request, Response, NextFunction } from "express"
import { MovieService } from "../services/movie.service"
import { MESSAGES } from "../constants/messages.constants"

export const searchMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, page = 1 } = req.query

    const result = await MovieService.searchMovies(q as string, Number(page))

    res.json({
      success: true,
      ...result
    })

  } catch (error) {
    next(error)
  }
}

export const getFavorites = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const result = MovieService.getFavorites(Number(page), Number(limit))

    res.json({
      success: true,
      ...result
    })
  } catch (error) {
    next(error)
  }
}

export const addFavorite = (req: Request, res: Response, next: NextFunction) => {
  try {
    MovieService.addFavorite(req.body)

    res.json({
      success: true,
      message: MESSAGES.SUCCESS.MOVIE_ADDED
    })
  } catch (error) {
    next(error)
  }
}

export const removeFavorite = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string }

    MovieService.removeFavorite(id)

    res.json({
      success: true,
      message: MESSAGES.SUCCESS.MOVIE_REMOVED
    })
  } catch (error) {
    next(error)
  }
}