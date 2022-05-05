import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ormConfig } from '../../ormconfig';

export const dataSource = new DataSource({
    type: "postgres",
    host: ormConfig.host,
    port: Number(ormConfig.port),
    username: ormConfig.username,
    password: ormConfig.password,
    database: ormConfig.database,
    synchronize: ormConfig.synchronize,
    logging: ormConfig.logging,
    entities: ormConfig.entities
});