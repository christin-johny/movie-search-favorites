import { Router } from "express"
import {
  searchMovies,
  getFavorites,
  addFavorite,
  removeFavorite
} from "../controllers/movie.controller"

const router = Router()

router.get("/search", searchMovies)

router.get("/favorites", getFavorites)

router.post("/favorites", addFavorite)

router.delete("/favorites/:id", removeFavorite)

export default router