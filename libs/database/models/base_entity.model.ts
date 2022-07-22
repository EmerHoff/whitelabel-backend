import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'status' })
  status: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  created_at: Date;

  @Column('timestamp without time zone', { name: 'updated_at' })
  updated_at: Date;

  @BeforeInsert()
  setTimestamps() {
    this.created_at = new Date();
    this.updated_at = this.created_at;
  }

  @BeforeUpdate()
  updateTimestamps() {
    this.updated_at = new Date();
  }
}
