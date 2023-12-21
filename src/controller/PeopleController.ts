import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import PeopleService from '@src/services/PeopleService';

class PeopleController {
    /* The `createPeople` method in the `PeopleController` class is an asynchronous function that handles the
   creation of a people. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createPeople = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createPeople in PeopleController');
        try {
            const response: ResponseStructure = await PeopleService.createPeople(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getPeopleById` method in the `PeopleController` class is an asynchronous function that handles
    the retrieval of a people by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getPeopleById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getPeopleById in PeopleController');
        try {
            const response: ResponseStructure = await PeopleService.getPeopleById(
                req.params.peopleId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updatePeople` method in the `PeopleController` class is an asynchronous function that handles the
    updating of a people. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updatePeople = async (req: any, res: any, next: any) => {
        logger.info('Inside updatePeople in PeopleController');

        try {

            const response: ResponseStructure = await PeopleService.updatePeople(
                req.params.peopleId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllPeoples` method in the `PeopleController` class is an asynchronous function that handles
    the retrieval of all peoples. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllPeoples = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllPeoples in PeopleController');
        try {
            const response: ResponseStructure = await PeopleService.getAllPeoples(
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

    /* The `deletePeople` method in the `PeopleController` class is an asynchronous function that handles the
    deletion of a people. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deletePeople = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deletePeople in PeopleController');
        try {
            const response: ResponseStructure = await PeopleService.deletePeople(
                req.params.peopleId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new PeopleController();