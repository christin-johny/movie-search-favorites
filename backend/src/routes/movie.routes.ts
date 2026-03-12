import { Router } from "express"
import { API_ENDPOINTS } from "../constants/api.constants"
import {
  searchMovies,
  getFavorites,
  addFavorite,
  removeFavorite
} from "../controllers/movie.controller"

const router = Router()

router.get(API_ENDPOINTS.MOVIES.SEARCH, searchMovies)

router.get(API_ENDPOINTS.MOVIES.FAVORITES, getFavorites)

router.post(API_ENDPOINTS.MOVIES.FAVORITES, addFavorite)

router.delete(API_ENDPOINTS.MOVIES.FAVORITE_BY_ID, removeFavorite)

export default router