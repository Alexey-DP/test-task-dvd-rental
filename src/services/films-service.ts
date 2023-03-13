import { AppDataSource } from '../utils/data-source';

const queryFilm = `SELECT f.film_id, f.title, f.description, f.release_year,
    f.rental_duration, f.length, f.replacement_cost, f.rating, f.last_update,
    f.special_features, f.fulltext,
    array_agg(c.name) AS categories,
    string_agg(l.name, ',') AS language
    FROM film f
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    JOIN language l ON f.language_id = l.language_id
    WHERE f.title ILIKE $1
    GROUP BY f.film_id`;

export const getFilmByTitle = async (title: string) => {
    return await AppDataSource.query(
        queryFilm,
        [title]);
}