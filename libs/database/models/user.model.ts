import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base_entity.model';

@Entity('user')
export class User extends BaseEntity {
  @Column('varchar', { name: 'username' })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'last_name' })
  last_name: string;

  @Column('varchar', { name: 'telephone' })
  telephone: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { name: 'login_token' })
  login_token: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { name: 'device_token' })
  device_token: string;

  @Column('varchar', { name: 'type' })
  type: string;
}
