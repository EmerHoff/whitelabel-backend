import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity('email_log')
export class EmailLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (tbUser) => tbUser.id)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_id: User;

  @Column('varchar', { name: 'content' })
  content: string;

  @Column('varchar', { name: 'type' })
  type: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  created_at: Date;

  @BeforeInsert()
  setTimestamps() {
    this.created_at = new Date();
  }
}
