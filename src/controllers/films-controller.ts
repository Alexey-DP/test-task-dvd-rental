import { NextFunction, Request, Response } from 'express';
import { nodeCache, redisClient } from '../app';
import { CONSTANTS } from '../enum/constants-enum';
import { getFilmByTitle } from '../services/films-service';

export const getFilmByTitleHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const filmTitle = req.params.title.replace('-', ' ').toLowerCase();
        let film;

        if (nodeCache.has(filmTitle)) {
            film = JSON.parse(nodeCache.get(filmTitle) as string);
            return res.status(200).json(film);
        }

        film = await redisClient.get(filmTitle);

        if (film) {
            return res.status(200).json(JSON.parse(film));
        }

        film = await getFilmByTitle(filmTitle);

        if (film.length <= 0) {
            return res.status(404).json({ message: `Film with title: ${filmTitle} not found` });
        }

        nodeCache.set(filmTitle, JSON.stringify(film[0]));

        await redisClient.set(filmTitle,
            JSON.stringify(film[0]),
            { EX: CONSTANTS.REDIS_CACHE_TIME });

        res.status(200).json(film[0]);

    } catch (err: any) {
        next(err);
    }
};