import { Request, Response, NextFunction } from "express"
import { MESSAGES } from "../constants/messages.constants"
import { AppError } from "../utils/AppError"

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack)
  
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : MESSAGES.ERROR.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: MESSAGES.ERROR.NOT_FOUND
  })
}
