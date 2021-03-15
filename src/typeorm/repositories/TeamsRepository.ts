import { Repository, getRepository } from 'typeorm'
import { ITeam } from '../../models/ITeam'
import ITeamsRepository from '../../repositories/ITeamsRepository'
import Team from '../entities/Team'

export default class TeamsRepository implements ITeamsRepository {
  private teamsRepository: Repository<Team>

  constructor() {
    this.teamsRepository = getRepository(Team)
  }

  async create(data: Partial<ITeam>): Promise<ITeam> {
    const team = this.teamsRepository.create(data)
    await this.teamsRepository.save(team)
    return team
  }

  async findTeamByName(name: string): Promise<ITeam | undefined> {
    return await this.teamsRepository.findOne({ where: { name } })
  }
}
