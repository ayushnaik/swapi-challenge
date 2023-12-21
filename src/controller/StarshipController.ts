import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import StarshipService from '@src/services/StarshipService';

class StarshipController {
    /* The `createStarship` method in the `StarshipController` class is an asynchronous function that handles the
   creation of a starship. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createStarship = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createStarship in StarshipController');
        try {
            const response: ResponseStructure = await StarshipService.createStarship(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getStarshipById` method in the `StarshipController` class is an asynchronous function that handles
    the retrieval of a starship by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getStarshipById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getStarshipById in StarshipController');
        try {
            const response: ResponseStructure = await StarshipService.getStarshipById(
                req.params.starshipId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updateStarship` method in the `StarshipController` class is an asynchronous function that handles the
    updating of a starship. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updateStarship = async (req: any, res: any, next: any) => {
        logger.info('Inside updateStarship in StarshipController');

        try {

            const response: ResponseStructure = await StarshipService.updateStarship(
                req.params.starshipId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllStarships` method in the `StarshipController` class is an asynchronous function that handles
    the retrieval of all starships. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllStarships = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllStarships in StarshipController');
        try {
            const response: ResponseStructure = await StarshipService.getAllStarships(
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

    /* The `deleteStarship` method in the `StarshipController` class is an asynchronous function that handles the
    deletion of a starship. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deleteStarship = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deleteStarship in StarshipController');
        try {
            const response: ResponseStructure = await StarshipService.deleteStarship(
                req.params.starshipId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new StarshipController();