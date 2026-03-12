import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import movieRoutes from "./routes/movie.routes"
import { API_ENDPOINTS } from "./constants/api.constants"
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(API_ENDPOINTS.MOVIES.BASE, movieRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})