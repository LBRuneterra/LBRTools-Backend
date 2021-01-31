import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { UserType, IUser } from '../../models/IUser'

@Entity('users')
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password?: string

  @Column({ unique: true })
  email: string

  @Column('enum', { enum: UserType, default: UserType.PLAYER })
  type: UserType

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  //Should have decks array here
}
