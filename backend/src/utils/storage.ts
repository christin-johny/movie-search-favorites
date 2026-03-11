import fs from "fs"
import path from "path"
import { Movie } from "../types/movie.types"

const filePath = path.join(__dirname, "../data/favorites.json")

export const readFavorites = (): Movie[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export const writeFavorites = (movies: Movie[]) => {
  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2))
}