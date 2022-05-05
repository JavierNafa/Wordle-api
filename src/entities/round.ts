import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm";
import { User } from './user';

@Entity('rounds')
export class Round {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'int' })
    attempts: number;

    @Column({ type: 'boolean' })
    winner: boolean;

    @Column({ type: 'boolean' })
    finished: boolean;

    @Column({ type: 'time' })
    remaining: string;

    @Index()
    @Column({ type: 'uuid' })
    userUuid: string;

    @ManyToOne(() => User, user => user.round)
    user: User;

}