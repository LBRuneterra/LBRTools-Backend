import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

import { IDecks } from '../../models/IDecks'
import User from './User'

@Entity('decks')
export default class Decks implements IDecks {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  tag: string

  //This is a string with multiple decks separated by ';'
  @Column()
  decks: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne((type) => User, (user) => user.decks)
  user: User
}
