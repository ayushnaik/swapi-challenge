import logger from '@src/shared/Logger';
import ResponseStructure from '@src/shared/ResponseStructure';
import VehicleService from '@src/services/VehicleService';

class VehicleController {
    /* The `createVehicle` method in the `VehicleController` class is an asynchronous function that handles the
   creation of a vehicle. It takes three parameters: `req`, `res`, and `next`, which represent the
   request, response, and next middleware function respectively. */
    public createVehicle = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside createVehicle in VehicleController');
        try {
            const response: ResponseStructure = await VehicleService.createVehicle(
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getVehicleById` method in the `VehicleController` class is an asynchronous function that handles
    the retrieval of a vehicle by its ID. It takes three parameters: `req`, `res`, and `next`, which
    represent the request, response, and next middleware function respectively. */
    public getVehicleById = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getVehicleById in VehicleController');
        try {
            const response: ResponseStructure = await VehicleService.getVehicleById(
                req.params.vehicleId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `updateVehicle` method in the `VehicleController` class is an asynchronous function that handles the
    updating of a vehicle. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public updateVehicle = async (req: any, res: any, next: any) => {
        logger.info('Inside updateVehicle in VehicleController');

        try {

            const response: ResponseStructure = await VehicleService.updateVehicle(
                req.params.vehicleId,
                req.body,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };

    /* The `getAllVehicles` method in the `VehicleController` class is an asynchronous function that handles
    the retrieval of all vehicles. It takes three parameters: `req`, `res`, and `next`, which represent
    the request, response, and next middleware function respectively. */
    public getAllVehicles = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside getAllVehicles in VehicleController');
        try {
            const response: ResponseStructure = await VehicleService.getAllVehicles(
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

    /* The `deleteVehicle` method in the `VehicleController` class is an asynchronous function that handles the
    deletion of a vehicle. It takes three parameters: `req`, `res`, and `next`, which represent the
    request, response, and next middleware function respectively. */
    public deleteVehicle = async (
        req: any,
        res: any,
        next: any,
    ) => {
        logger.info('Inside deleteVehicle in VehicleController');
        try {
            const response: ResponseStructure = await VehicleService.deleteVehicle(
                req.params.vehicleId,
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export default new VehicleController();