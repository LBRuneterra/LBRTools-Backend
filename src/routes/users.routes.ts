import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import UsersController from '../controllers/UsersController'

const upload = multer(uploadConfig.multer)
const usersController = new UsersController()
const usersRouter = Router()

usersRouter.post('/upload', upload.single('usersDeckslist'), usersController.upload)
export default usersRouter
