import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { ITeamDayRegister } from '../../models/ITeamDayRegister'
import Team from './Team'

@Entity('teams_day_register')
export default class TeamDayRegister implements ITeamDayRegister {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  responsible: string

  @ManyToOne(() => Team, (team) => team.players)
  @JoinColumn({ name: 'team_id' })
  team: Team

  @Column({ nullable: false })
  registerTime: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
