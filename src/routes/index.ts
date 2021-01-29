import { Router, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

import AppError from '../errors/AppError'

const routes = Router()

// Rota para garantir que o backend está online e outras rotas que não precisem de autenticação pelo SA²
routes.get('/status', function (_, res) {
  res.status(200).json({ message: 'server está on', online: true })
})

dotenv.config()

export default routes
