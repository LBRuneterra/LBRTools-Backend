import { IUser } from './IUser'

export interface INewDecks {
  //This is a string with multiple decks separated by ';'
  decks: string
  user: IUser
}

export interface IDecks {
  id: number
  //This is a string with multiple decks separated by ';'
  decks: string
  created_at: Date
  updated_at: Date
  user: IUser
}
