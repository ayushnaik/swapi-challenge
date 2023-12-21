import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import FilmService from '@src/services/FilmService';

class FilmController {
    /* The `createFilm` method in the `FilmController` class is an asynchronous function that handles the
   creation of a film. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createFilm = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createFilm in FilmController');
        try {
            const response: ResponseStructure = await FilmService.createFilm(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getFilmById` method in the `FilmController` class is an asynchronous function that handles
    the retrieval of a film by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getFilmById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getFilmById in FilmController');
        try {
            const response: ResponseStructure = await FilmService.getFilmById(
                req.params.filmId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updateFilm` method in the `FilmController` class is an asynchronous function that handles the
    updating of a film. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updateFilm = async (req: any, res: any, next: any) => {
        logger.info('Inside updateFilm in FilmController');

        try {

            const response: ResponseStructure = await FilmService.updateFilm(
                req.params.filmId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllFilms` method in the `FilmController` class is an asynchronous function that handles
    the retrieval of all films. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllFilms = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllFilms in FilmController');
        try {
            const response: ResponseStructure = await FilmService.getAllFilms(
                req.query.SearchString,
                req.query.PageSize,
                req.query.PageNumber,
                req.query.OrderBy,
                req.query.Ordering,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `deleteFilm` method in the `FilmController` class is an asynchronous function that handles the
    deletion of a film. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deleteFilm = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deleteFilm in FilmController');
        try {
            const response: ResponseStructure = await FilmService.deleteFilm(
                req.params.filmId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new FilmController();