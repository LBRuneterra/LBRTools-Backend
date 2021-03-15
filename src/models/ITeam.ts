import { IUser } from './IUser'

export interface ITeam {
  id: number
  name: string
  players: IUser[]
  created_at: Date
  updated_at: Date
}
