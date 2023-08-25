// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class UserNote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    note: string;

    @ManyToOne(() => User, (user) => user.notes)
    user: User
}
