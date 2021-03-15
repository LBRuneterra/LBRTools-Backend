import { Repository, getRepository } from 'typeorm'
import { ITeamDayRegister } from '../../models/ITeamDayRegister'
import ITeamsDayRegisterRepository from '../../repositories/ITeamsDayRegisterRepository'
import TeamDayRegister from '../entities/TeamDayRegister'

export default class TeamsDayRegisterRepository implements ITeamsDayRegisterRepository {
  private registerRepository: Repository<TeamDayRegister>

  constructor() {
    this.registerRepository = getRepository(TeamDayRegister)
  }

  async create(data: ITeamDayRegister): Promise<ITeamDayRegister> {
    const register = this.registerRepository.create(data)
    await this.registerRepository.save(register)
    return register
  }
}
