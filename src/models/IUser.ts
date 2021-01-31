export enum UserType {
  ADMIN = 'admin',
  PLAYER = 'player'
}

export interface INewUser {
  name: string
  password?: string
  email: string
  type: UserType
}

export interface IUser {
  id: number
  name: string
  password?: string
  email: string
  type: UserType
  created_at: Date
  updated_at: Date
  //Should have decks array here
}
