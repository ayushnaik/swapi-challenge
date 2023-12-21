import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import PlanetService from '@src/services/PlanetService';

class PlanetController {
    /* The `createPlanet` method in the `PlanetController` class is an asynchronous function that handles the
   creation of a planet. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createPlanet = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createPlanet in PlanetController');
        try {
            const response: ResponseStructure = await PlanetService.createPlanet(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getPlanetById` method in the `PlanetController` class is an asynchronous function that handles
    the retrieval of a planet by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getPlanetById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getPlanetById in PlanetController');
        try {
            const response: ResponseStructure = await PlanetService.getPlanetById(
                req.params.planetId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updatePlanet` method in the `PlanetController` class is an asynchronous function that handles the
    updating of a planet. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updatePlanet = async (req: any, res: any, next: any) => {
        logger.info('Inside updatePlanet in PlanetController');

        try {

            const response: ResponseStructure = await PlanetService.updatePlanet(
                req.params.planetId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllPlanets` method in the `PlanetController` class is an asynchronous function that handles
    the retrieval of all planets. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllPlanets = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllPlanets in PlanetController');
        try {
            const response: ResponseStructure = await PlanetService.getAllPlanets(
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

    /* The `deletePlanet` method in the `PlanetController` class is an asynchronous function that handles the
    deletion of a planet. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deletePlanet = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deletePlanet in PlanetController');
        try {
            const response: ResponseStructure = await PlanetService.deletePlanet(
                req.params.planetId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new PlanetController();