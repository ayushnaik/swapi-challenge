import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import SpeciesService from '@src/services/SpeciesService';

class SpeciesController {
    /* The `createSpecies` method in the `SpeciesController` class is an asynchronous function that handles the
   creation of a species. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createSpecies = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createSpecies in SpeciesController');
        try {
            const response: ResponseStructure = await SpeciesService.createSpecies(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getSpeciesById` method in the `SpeciesController` class is an asynchronous function that handles
    the retrieval of a species by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getSpeciesById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getSpeciesById in SpeciesController');
        try {
            const response: ResponseStructure = await SpeciesService.getSpeciesById(
                req.params.speciesId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updateSpecies` method in the `SpeciesController` class is an asynchronous function that handles the
    updating of a species. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updateSpecies = async (req: any, res: any, next: any) => {
        logger.info('Inside updateSpecies in SpeciesController');

        try {

            const response: ResponseStructure = await SpeciesService.updateSpecies(
                req.params.speciesId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllSpeciess` method in the `SpeciesController` class is an asynchronous function that handles
    the retrieval of all speciess. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllSpeciess = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllSpeciess in SpeciesController');
        try {
            const response: ResponseStructure = await SpeciesService.getAllSpeciess(
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

    /* The `deleteSpecies` method in the `SpeciesController` class is an asynchronous function that handles the
    deletion of a species. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deleteSpecies = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deleteSpecies in SpeciesController');
        try {
            const response: ResponseStructure = await SpeciesService.deleteSpecies(
                req.params.speciesId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new SpeciesController();