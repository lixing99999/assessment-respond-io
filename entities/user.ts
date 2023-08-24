// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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
