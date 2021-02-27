import { IDecks, INewDecks } from '../models/IDecks'

export default interface IUsersRepository {
  create(data: INewDecks): Promise<Partial<IDecks>>
}
