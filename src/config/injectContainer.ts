import { container } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import UsersRepository from '../typeorm/repositories/UsersRepository'

export enum InjectableRepositories {
  USERS = 'USERS'
}

container.registerSingleton<IUsersRepository>(InjectableRepositories.USERS, UsersRepository)
