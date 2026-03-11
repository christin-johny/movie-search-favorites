import { Router } from "express"
import { searchMovies } from "../controllers/movie.controller"

const router = Router()

router.get("/search", searchMovies)

export default router