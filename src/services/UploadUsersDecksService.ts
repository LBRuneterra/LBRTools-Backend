import parse from 'csv-parse'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { createReadStream } from 'fs'
import { parse as parseDate } from 'date-fns'
import { ptBR as locale } from 'date-fns/locale'

import { INewUser, IUser, UserType } from '../models/IUser'
import IUsersRepository from '../repositories/IUsersRepository'
import { InjectableRepositories } from '../config/injectContainer'
import { tmpFolder } from '../config/upload'
import path from 'path'
import IDecksRepository from '../repositories/IDecksRepository'
import { IDecks, INewDecks } from '../models/IDecks'
import ITeamsRepository from '../repositories/ITeamsRepository'
import ITeamsDayRegisterRepository from '../repositories/ITeamsDayRegisterRepository'
import { ITeamDayRegister } from '../models/ITeamDayRegister'

@injectable()
class UploadUsersDecksService {
  constructor(
    @inject(InjectableRepositories.USERS)
    private usersRepository: IUsersRepository,
    @inject(InjectableRepositories.DECKS)
    private decksRepository: IDecksRepository,
    @inject(InjectableRepositories.TEAMS)
    private teamsRepository: ITeamsRepository,
    @inject(InjectableRepositories.REGISTER_DAY)
    private dayRegisterRepository: ITeamsDayRegisterRepository
  ) {}

  public async execute(csvFilename: string): Promise<IUser[]> {
    const fileFullPath = path.join(tmpFolder, csvFilename)
    const players: IUser[] = []
    const parser = createReadStream(fileFullPath).pipe(parse({ delimiter: ',', columns: true }))
    for await (const record of parser) {
      let i = 0
      const teamKey = Object.keys(record).filter((name) => /Time/.test(name))[0]
      const responsible = Object.keys(record).filter((name) => /Preenchido/.test(name))[0]
      const timestamp = Object.keys(record).filter((name) => /Carimbo/.test(name))[0]
      let team = await this.teamsRepository.findTeamByName(record[teamKey])
      if (!team) {
        const newTeam = {
          name: record[teamKey]
        }
        team = await this.teamsRepository.create(newTeam)
      }
      const registerTimestamp: Partial<ITeamDayRegister> = {
        responsible: record[responsible],
        team,
        registerTime: parseDate(record[timestamp], 'dd/MM/yyyy HH:mm:ss', new Date(), { locale })
      }
      await this.dayRegisterRepository.create(registerTimestamp)
      while (record[`Jogador ${++i}`]) {
        let [name, tag, _] = record[`Jogador ${++i}`].split('#')
        name = name.trim()
        let player = await this.usersRepository.findByNameTag(name, tag)
        if (!player) {
          const newUser: INewUser = {
            name,
            tag,
            type: UserType.PLAYER,
            team,
            // TODO hashes password to save it on database
            password: Math.random().toString(36).slice(-8)
          }
          player = await this.usersRepository.create(newUser)
          player.decks = []
        }
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
