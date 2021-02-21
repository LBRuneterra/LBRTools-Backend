import parse from 'csv-parse'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { createReadStream } from 'fs'

import { IUser, UserType } from '../models/IUser'
import IUsersRepository from '../repositories/IUsersRepository'
import { InjectableRepositories } from '../config/injectContainer'
import { tmpFolder } from '../config/upload'
import path from 'path'

@injectable()
class UploadUsersDecksService {
  constructor(
    @inject(InjectableRepositories.USERS)
    private usersRepository: IUsersRepository
  ) {}

  public async execute(csvFilename: string): Promise<IUser[]> {
    const fileFullPath = path.join(tmpFolder, csvFilename)
    console.log(`filename: ${fileFullPath}`)
    const players: IUser[] = []
    const parser = createReadStream(fileFullPath).pipe(parse({ delimiter: ',', columns: true }))
    for await (const record of parser) {
      //TODO create user if it not exists and add new reference on Decks table
      console.log(record)
    }
    return players
  }
}

export default UploadUsersDecksService
