import { ITeam } from './ITeam'

export interface ITeamDayRegister {
  id: number
  responsible: string
  team: ITeam
  registerTime: Date
  created_at: Date
  updated_at: Date
}
