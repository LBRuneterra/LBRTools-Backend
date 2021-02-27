import { IUser, UserType } from '../models/IUser'
import { hash } from 'bcryptjs'
import IUsersRepository from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { InjectableRepositories } from '../config/injectContainer'

interface CreateUserRequest {
  name: string
  email: string
  password: string
  type: UserType
}

@injectable()
class CreateUserService {
  constructor(
    @inject(InjectableRepositories.USERS)
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    email,
    password,
    type = UserType.PLAYER
  }: CreateUserRequest): Promise<IUser> {
    throw new Error('Method not implemented.')

    // if (!password) {
    //   throw new Error('Should have a password.')
    // }
    // // const checkUsersExists = await this.usersRepository.findByEmail(email)

    // if (checkUsersExists) {
    //   throw new Error('Email address already used.')
    // }

    // const hasedPassword = await hash(password, 8)
    // // return await this.usersRepository.create({ name, email, password: hasedPassword, type })
  }
}

export default CreateUserService
