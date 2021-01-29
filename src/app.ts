import express from 'express'
import 'express-async-errors'
import { createConnection } from 'typeorm'
import cors from 'cors'
import helmet from 'helmet'

import './config/injectContainer'

import 'reflect-metadata'

import routes from './routes'
import errorHandling from './middlewares/errorHandling'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    if (process.env.NODE_ENV === 'development') {
      this.express.use(cors())
    }
    this.environment()
    this.database()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(helmet())
  }

  private environment(): void {
    
  }

  private async database(): Promise<void> {
    // try {
    //   await createConnection()
    // } catch (err) {
    //   console.debug(err.stack)
    // }
  }

  private routes(): void {
    this.express.use(routes)
    this.express.use(errorHandling)
  }
}

export default new App().express
