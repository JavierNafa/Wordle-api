import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Round } from './round';

@Entity('words')
export class Word {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Index()
    @Column({ type: 'varchar' })
    word: string;

    @Index()
    @Column({ type: 'int' })
    length: number;

    @OneToMany(() => Round, round => round.word)
    rounds: Round[];
}