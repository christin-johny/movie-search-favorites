import axios from "axios";
import { readFavorites, writeFavorites } from "../utils/storage";
import { Movie } from "../types/movie.types";
import { API_ENDPOINTS } from "../constants/api.constants";
import { MESSAGES } from "../constants/messages.constants";
import { AppError } from "../utils/AppError";

export class MovieService {
 
  static async searchMovies(query: string, page: number) {
    if (!query) {
      throw new AppError(MESSAGES.ERROR.SEARCH_QUERY_REQUIRED, 400);
    }

    const response = await axios.get(
      `${API_ENDPOINTS.OMDB.BASE_URL}?apikey=${process.env.OMDB_API_KEY}&s=${query}&page=${page}`
    );

    const data = response.data;

    if (data.Response === "False") {
      throw new AppError(data.Error || MESSAGES.ERROR.FETCH_MOVIES_FAILED, 400);
    }

    const totalResults = parseInt(data.totalResults, 10) || 0;
    const totalPages = Math.ceil(totalResults / 10);

    return {
      data: data.Search || [],
      currentPage: Number(page),
      totalPages,
      totalResults
    };
  }
 
  static getFavorites(page: number = 1, limit: number = 10) {
    const favorites = readFavorites();
    const totalResults = favorites.length;
    const totalPages = Math.ceil(totalResults / limit);
     
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
     
    const paginatedFavorites = favorites.slice(startIndex, endIndex);

    return {
      data: paginatedFavorites,
      currentPage: page,
      totalPages,
      totalResults
    };
  }
 
  static addFavorite(movie: Movie): void {
    const favorites = readFavorites();
    const exists = favorites.find((f: Movie) => f.imdbID === movie.imdbID);

    if (exists) {
      throw new AppError(MESSAGES.ERROR.MOVIE_ALREADY_FAVORITED, 400);
    }

    favorites.push(movie);
    writeFavorites(favorites);
  }
 
  static removeFavorite(id: string): void {
    let favorites = readFavorites();
    const initialLength = favorites.length;
    
    favorites = favorites.filter((movie: Movie) => movie.imdbID !== id);

    if (favorites.length === initialLength) {
      throw new AppError(MESSAGES.ERROR.NOT_FOUND, 404);
    }

    writeFavorites(favorites);
  }
}
