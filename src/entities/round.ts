import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from './user';
import { Word } from './word';

@Entity('rounds')
export class Round {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'int', default: 0 })
    attempts: number;

    @Column({ type: 'boolean', default: false })
    winner: boolean;

    @Column({ type: 'boolean', default: false })
    finished: boolean;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date;

    @Index()
    @Column({ type: 'uuid', name: 'user_uuid' })
    userUuid: string;

    @ManyToOne(() => User, user => user.rounds, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @Index()
    @Column({ type: 'uuid', name: 'word_uuid' })
    wordUuid: string;

    @ManyToOne(() => Word, word => word.rounds, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'word_uuid' })
    word: Word;

}