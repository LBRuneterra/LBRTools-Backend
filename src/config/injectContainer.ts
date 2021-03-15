import { container } from 'tsyringe'

import IDecksRepository from '../repositories/IDecksRepository'
import ITeamsDayRegisterRepository from '../repositories/ITeamsDayRegisterRepository'
import ITeamsRepository from '../repositories/ITeamsRepository'
import IUsersRepository from '../repositories/IUsersRepository'

import DecksRepository from '../typeorm/repositories/DecksRepository '
import TeamsDayRegisterRepository from '../typeorm/repositories/TeamsDayRegisterRepository'
import TeamsRepository from '../typeorm/repositories/TeamsRepository'
import UsersRepository from '../typeorm/repositories/UsersRepository'

export enum InjectableRepositories {
  USERS = 'USERS',
  DECKS = 'DECKS',
  TEAMS = 'TEAMS',
  REGISTER_DAY = 'REGISTER_DAY'
}

container.registerSingleton<IUsersRepository>(InjectableRepositories.USERS, UsersRepository)
container.registerSingleton<IDecksRepository>(InjectableRepositories.DECKS, DecksRepository)
container.registerSingleton<ITeamsRepository>(InjectableRepositories.TEAMS, TeamsRepository)
container.registerSingleton<ITeamsDayRegisterRepository>(
  InjectableRepositories.REGISTER_DAY,
  TeamsDayRegisterRepository
)
