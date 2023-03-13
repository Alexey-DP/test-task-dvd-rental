import express from 'express';
import { getFilmByTitleHandler } from '../controllers/films-controller';

const router = express.Router();

router
    .get('/:title', getFilmByTitleHandler);

export default router;