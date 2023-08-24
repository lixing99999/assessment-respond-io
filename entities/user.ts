// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_of_birth: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
