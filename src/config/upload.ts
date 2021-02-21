import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

interface IUploadConfig {
  driver: 'disk'

  tmpFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }

  config: {
    disk: {}

    aws: {
      bucket: string
    }
  }
}

export const tmpFolder = path.resolve(__dirname, '..', '..', 'temp')

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const filehash = crypto.randomBytes(10).toString('hex')
        const fileName = `${filehash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  },

  config: {
    disk: {}
  }
} as IUploadConfig
