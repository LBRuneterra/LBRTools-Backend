import { ITeamDayRegister } from '../models/ITeamDayRegister'

export default interface ITeamsDayRegisterRepository {
  create(data: Partial<ITeamDayRegister>): Promise<ITeamDayRegister>
}
