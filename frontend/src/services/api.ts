import axios from "axios"
import { API_ENDPOINTS } from "../constants/api.constants"
import type { Movie } from "../types/movie"

// VITE_API_URL will be provided by Vercel in production
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
})

export const searchMovies = (query: string, page = 1) => {
  return API.get(`${API_ENDPOINTS.SEARCH}?q=${query}&page=${page}`)
}

export const getFavorites = (page = 1, limit = 10) => {
  return API.get(`${API_ENDPOINTS.FAVORITES}?page=${page}&limit=${limit}`)
}

export const addFavorite = (movie: Movie) => {
  return API.post(API_ENDPOINTS.FAVORITES, movie)
}

export const removeFavorite = (id: string) => {
  return API.delete(`${API_ENDPOINTS.FAVORITES}/${id}`)
}