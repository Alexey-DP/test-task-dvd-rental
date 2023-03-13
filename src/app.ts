import { CONSTANTS } from './enum/constants-enum';
require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import validateEnv from './utils/validate-env.ts ';
import NodeCache from 'node-cache';
import { createClient } from 'redis';
import { AppDataSource } from './utils/data-source';
import filmsRouter from './routes/films-routes';
import AppError from './errors/app-error';

export const nodeCache = new NodeCache({ stdTTL: CONSTANTS.NODE_CACHE_TIME });

export const redisClient = createClient({
    url: 'redis://redis:6379',
});

AppDataSource.initialize()
    .then(async () => {
        // VALIDATE ENV
        validateEnv();

        // CONNECT REDIS
        redisClient.on('error', err => console.log('Redis Client Error', err));
        await redisClient.connect();

        const app = express();

        // MIDDLEWARE
        app.use(express.json());

        // ROUTES
        app.use('/api/film', filmsRouter);

        // UNHANDLED ROUTE
        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(404, `Route ${req.originalUrl} not found`));
        });

        // GLOBAL ERROR HANDLER
        app.use(
            (error: AppError, req: Request, res: Response, next: NextFunction) => {
                error.status = error.status || 'error';
                error.statusCode = error.statusCode || 500;

                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                });
            }
        );

        const port = config.get<number>('port') || 3001;
        app.listen(port, () =>
            console.log(`Server started on port: ${port}`));
    })
    .catch((error) => console.log(error));