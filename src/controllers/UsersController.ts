import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateUserService from '../services/CreateUserService'
import UploadUsersDecksService from '../services/UploadUsersDecksService'

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, type } = req.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password,
      type
    })

    return res.json(user)
  }

  public async upload(req: Request, res: Response): Promise<Response> {
    const uploadCsv = container.resolve(UploadUsersDecksService)
    const players = await uploadCsv.execute(req.file.filename)

    return res.json(players)
  }
}
