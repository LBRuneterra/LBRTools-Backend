import { IDecks } from './IDecks'

export enum UserType {
  ADMIN = 'admin',
  PLAYER = 'player'
}

export interface INewUser {
  name: string
  password?: string
  tag: string
  type: UserType
}

export interface IUser {
  id: number
  name: string
  password?: string
  tag: string
  type: UserType
  decks: IDecks[]
  created_at: Date
  updated_at: Date
}
