import { Request, Response } from "express"
import axios from "axios"

export const searchMovies = async (req: Request, res: Response) => {

  try {

    const { q, page = 1 } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      })
    }

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${q}&page=${page}`
    )

    res.json({
      success: true,
      data: response.data
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch movies"
    })

  }

}