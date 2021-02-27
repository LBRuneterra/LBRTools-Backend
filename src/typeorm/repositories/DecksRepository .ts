import { Repository, getRepository } from 'typeorm'
import { IDecks, INewDecks } from '../../models/IDecks'
import IDecksRepository from '../../repositories/IDecksRepository'
import Decks from '../entities/Decks'

export default class DecksRepository implements IDecksRepository {
  private DecksRepository: Repository<Decks>

  constructor() {
    this.DecksRepository = getRepository(Decks)
  }

  async create(data: INewDecks): Promise<Partial<Decks>> {
    const decks = this.DecksRepository.create(data)
    await this.DecksRepository.save(decks)
    return {
      id: decks.id,
      decks: decks.decks,
      created_at: decks.created_at,
      updated_at: decks.updated_at
    }
  }
}
