import { Repository, getRepository } from 'typeorm'
import { INewUser, IUser } from '../../models/IUser'
import IUsersRepository from '../../repositories/IUsersRepository'
import User from '../entities/User'

export default class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getRepository(User)
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id)
    if (user) {
      delete user.password
    }
    return user
  }

  async findByNameTag(name: string, tag: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { name, tag }, relations: ['decks'] })
    if (user) {
      delete user.password
    }
    return user
  }

  async create(data: INewUser): Promise<User> {
    const user = this.usersRepository.create(data)
    await this.usersRepository.save(user)
    delete user.password
    return user
  }
}
