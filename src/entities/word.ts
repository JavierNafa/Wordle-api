import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";


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
}