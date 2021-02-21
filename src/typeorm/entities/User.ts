import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'

import { UserType, IUser } from '../../models/IUser'
import Decks from './Decks'

@Entity('users')
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column()
  password?: string

  @Column({ nullable: false })
  tag: string

  @Column('enum', { enum: UserType, default: UserType.PLAYER })
  type: UserType

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany((type) => Decks, (decks) => decks.user)
  decks: Decks[]
}
