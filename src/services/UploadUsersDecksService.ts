import parse from 'csv-parse'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { createReadStream } from 'fs'

import { INewUser, IUser, UserType } from '../models/IUser'
import IUsersRepository from '../repositories/IUsersRepository'
import { InjectableRepositories } from '../config/injectContainer'
import { tmpFolder } from '../config/upload'
import path from 'path'
import IDecksRepository from '../repositories/IDecksRepository'
import { IDecks, INewDecks } from '../models/IDecks'

@injectable()
class UploadUsersDecksService {
  constructor(
    @inject(InjectableRepositories.USERS)
    private usersRepository: IUsersRepository,
    @inject(InjectableRepositories.DECKS)
    private decksRepository: IDecksRepository
  ) {}

  public async execute(csvFilename: string): Promise<IUser[]> {
    const fileFullPath = path.join(tmpFolder, csvFilename)
    console.log(`filename: ${fileFullPath}`)
    const players: IUser[] = []
    const parser = createReadStream(fileFullPath).pipe(parse({ delimiter: ',', columns: true }))
    for await (const record of parser) {
      let i = 0
      while (record[`Jogador ${++i}`]) {
        let [name, tag, _] = record[`Jogador ${++i}`].split('#')
        name = name.trim()
        let player = await this.usersRepository.findByNameTag(name, tag)
        if (!player) {
          const newUser: INewUser = {
            name,
            tag,
            type: UserType.PLAYER,
            password: Math.random().toString(36).slice(-8)
          }
          player = await this.usersRepository.create(newUser)
          player.decks = []
        }
        console.log(player)
        let decks = ''
        let j = 0
        while (record[`Deck ${++j} Jogador ${i}`]) {
          decks += `${record[`Deck ${j} Jogador ${i}`]};`
        }
        let newDecks: INewDecks = {
          user: player,
          decks
        }
        const playerDecks = (await this.decksRepository.create(newDecks)) as IDecks
        player.decks = [...player.decks, playerDecks]
        players.push(player)
      }
    }
    return players
  }
}

export default UploadUsersDecksService
