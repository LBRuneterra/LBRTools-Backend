import { Repository, getRepository } from 'typeorm'
import { INewUser, IUser } from '../../models/IUser'
import IUsersRepository from '../../repositories/IUsersRepository'
import User from '../entities/User'

export default class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getRepository(User)
  }

  findById(id: string): Promise<IUser | undefined> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return await this.usersRepository.findOne({ where: { email } })
  }

  async create(data: INewUser): Promise<IUser> {
    const user = this.usersRepository.create(data)
    await this.usersRepository.save(user)
    delete user.password
    return user
  }
}
