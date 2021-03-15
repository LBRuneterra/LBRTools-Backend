import { IDecks } from './IDecks'
import { ITeam } from './ITeam'

export enum UserType {
  ADMIN = 'admin',
  PLAYER = 'player'
}

export interface INewUser {
  name: string
  password?: string
  tag: string
  type: UserType
  team: ITeam
}

export interface IUser {
  id: number
  name: string
  password?: string
  tag: string
  type: UserType
  decks: IDecks[]
  team: ITeam
  created_at: Date
  updated_at: Date
}
