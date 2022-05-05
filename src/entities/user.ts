import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Index()
    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', name: 'first_name' })
    firstName: string;

    @Column({ type: 'varchar', name: 'last_name' })
    lastName: string;
}