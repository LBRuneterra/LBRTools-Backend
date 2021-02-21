import { Router, Request, Response, NextFunction } from 'express'

import usersRouter from './users.routes'

const routes = Router()

routes.get('/status', function (_, res) {
  res.status(200).json({ message: 'server está on', online: true })
})

routes.use('/users', usersRouter)

export default routes
