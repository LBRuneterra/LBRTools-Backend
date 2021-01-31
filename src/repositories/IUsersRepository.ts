import { INewUser, IUser } from '../models/IUser'

export default interface IUsersRepository {
  findById(id: string): Promise<IUser | undefined>
  findByEmail(email: string): Promise<IUser | undefined>
  create(data: INewUser): Promise<IUser>
}
