import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

const errorHandling = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error && error instanceof AppError) {
    return res.status(error.code).json({ error })
  }
}

export default errorHandling
