import { container } from 'tsyringe'

import IDecksRepository from '../repositories/IDecksRepository'
import IUsersRepository from '../repositories/IUsersRepository'

import DecksRepository from '../typeorm/repositories/DecksRepository '
import UsersRepository from '../typeorm/repositories/UsersRepository'

export enum InjectableRepositories {
  USERS = 'USERS',
  DECKS = 'DECKS'
}

container.registerSingleton<IUsersRepository>(InjectableRepositories.USERS, UsersRepository)
container.registerSingleton<IDecksRepository>(InjectableRepositories.DECKS, DecksRepository)
