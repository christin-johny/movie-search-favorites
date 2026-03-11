import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export const searchMovies = (query: string, page = 1) => {
  return API.get(`/movies/search?q=${query}&page=${page}`)
}

export const getFavorites = () => {
  return API.get("/movies/favorites")
}

export const addFavorite = (movie: any) => {
  return API.post("/movies/favorites", movie)
}

export const removeFavorite = (id: string) => {
  return API.delete(`/movies/favorites/${id}`)
}