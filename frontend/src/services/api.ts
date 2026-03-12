import axios from "axios"
import { API_ENDPOINTS } from "../constants/api.constants"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export const searchMovies = (query: string, page = 1) => {
  return API.get(`${API_ENDPOINTS.SEARCH}?q=${query}&page=${page}`)
}

export const getFavorites = (page = 1, limit = 10) => {
  return API.get(`${API_ENDPOINTS.FAVORITES}?page=${page}&limit=${limit}`)
}

export const addFavorite = (movie: any) => {
  return API.post(API_ENDPOINTS.FAVORITES, movie)
}

export const removeFavorite = (id: string) => {
  return API.delete(`${API_ENDPOINTS.FAVORITES}/${id}`)
}