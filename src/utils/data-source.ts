require('dotenv').config()
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import config from 'config';

const postgresConfig = config.get<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}>('postgresConfig');

const options: DataSourceOptions = {
    ...postgresConfig,
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
}

export const AppDataSource = new DataSource(options);