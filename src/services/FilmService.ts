import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import Film from '@src/models/Film';
const { getNamespace } = require("cls-hooked");

class FilmService {
    /* The `createFilm` method is a public method of the `FilmService` class. It is an asynchronous
    function that takes an argument `newFilm` of type `any`. */
    public createFilm = async (newFilm: any) => {
        logger.info('Inside createFilm in FilmService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const filmExist: any = await Film.findOne({ url: newFilm.url });

            if (filmExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Film already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const film = new Film(newFilm);

            await film.save();

            return new ResponseStructure(
                true,
                200,
                'Film Record Created Successfully.',
                film,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `getFilmById` method is a public method of the `FilmService` class. It is an asynchronous
    function that takes an argument `filmId` of type `string`. */
    public getFilmById = async (filmId: string) => {
        logger.info('Inside getFilmById in FilmService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const film: any = await Film.findOne({ _id: filmId });

            if (!film) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Film does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Film Record Retrieved Successfully.',
                film,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `updateFilm` method is a public method of the `FilmService` class. It is an asynchronous
    function that takes two arguments: `filmId` of type `string` and `newFilm` of type `any`. */
    public updateFilm = async (filmId: string, newFilm: any) => {
        logger.info('Inside updateFilm in FilmService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const film: any = await Film.findOne({ _id: filmId });

            if (!film) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Film does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Film.updateOne({ _id: filmId }, newFilm);

            return new ResponseStructure(
                true,
                200,
                'Film Record Updated Successfully.',
                {},
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `getAllFilms` method is a public method of the `FilmService` class. It is an asynchronous
    function that retrieves a list of films based on the provided search criteria and pagination
    parameters. */
    public getAllFilms = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllFilms in FilmService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {


            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            producer: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            director: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            title: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            url: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                    ],
                };
            }

            PageNumber = Math.max(0, PageNumber - 1);

            const order: any = {};
            if (OrderBy && Ordering) {
                if (OrderBy == 'director') order.director = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'episode_id') order.episode_id = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'producer') order.producer = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'release_date') order.release_date = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'title') order.title = Ordering == 'ASC' ? 1 : -1;
            } else order.createdAt = 1;

            const pagination = {
                $facet: {
                    page: [
                        { $sort: order },
                        { $skip: PageSize * PageNumber },
                        { $limit: Number(PageSize) },
                    ],
                    total: [{ $count: 'totalItems' }],
                },
            };
            let films: any = await Film.aggregate([
                searchMatch,
                pagination,
            ]);

            films = {
                page: films[0].page,
                totalItems: films[0].total[0] ? films[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Films Documents Retrieved Successfully.',
                films,
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };

    /* The `deleteFilm` method is a public method of the `FilmService` class. It is an asynchronous
    function that takes an argument `filmId` of type `string`. */
    public deleteFilm = async (filmId: string) => {
        logger.info('Inside deleteFilm in FilmService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const film: any = await Film.findOne({ _id: filmId });

            if (!film) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Film does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Film.deleteOne({ _id: filmId });

            return new ResponseStructure(
                true,
                200,
                'Film Record Deleted Successfully.',
                {},
                {},
                traceId
            );
        } catch (error: any) {
            logger.error(
                `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
            );
            throw error;
        }
    };
}

export default new FilmService();