// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserNote } from "./user-note";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_of_birth: Date;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;


  @OneToMany(() => UserNote, (userNote) => userNote.user)
  notes: UserNote[]
}
