import { ITeam } from '../models/ITeam'

export default interface ITeamsRepository {
  create(data: Partial<ITeam>): Promise<ITeam>
  findTeamByName(name: string): Promise<ITeam | undefined>
}
