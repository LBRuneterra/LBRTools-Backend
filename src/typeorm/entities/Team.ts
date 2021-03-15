import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { ITeam } from '../../models/ITeam'
import { IUser } from '../../models/IUser'

import User from './User'

@Entity('teams')
export default class Team implements ITeam {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @OneToMany(() => User, (player) => player.team)
  players: IUser[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
