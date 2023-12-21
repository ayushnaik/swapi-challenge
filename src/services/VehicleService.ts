import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import Vehicle from '@src/models/Vehicle';
const { getNamespace } = require("cls-hooked");

class VehicleService {
    /* The `createVehicle` method is a public method of the `VehicleService` class. It is an asynchronous
    function that takes an argument `newVehicle` of type `any`. */
    public createVehicle = async (newVehicle: any) => {
        logger.info('Inside createVehicle in VehicleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const vehicleExist: any = await Vehicle.findOne({ url: newVehicle.url });

            if (vehicleExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Vehicle already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const vehicle = new Vehicle(newVehicle);

            await vehicle.save();

            return new ResponseStructure(
                true,
                200,
                'Vehicle Record Created Successfully.',
                vehicle,
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

    /* The `getVehicleById` method is a public method of the `VehicleService` class. It is an asynchronous
    function that takes an argument `vehicleId` of type `string`. */
    public getVehicleById = async (vehicleId: string) => {
        logger.info('Inside getVehicleById in VehicleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const vehicle: any = await Vehicle.findOne({ _id: vehicleId });

            if (!vehicle) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Vehicle does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Vehicle Record Created Successfully.',
                vehicle,
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

    /* The `updateVehicle` method is a public method of the `VehicleService` class. It is an asynchronous
    function that takes two arguments: `vehicleId` of type `string` and `newVehicle` of type `any`. */
    public updateVehicle = async (vehicleId: string, newVehicle: any) => {
        logger.info('Inside updateVehicle in VehicleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const vehicle: any = await Vehicle.findOne({ _id: vehicleId });

            if (!vehicle) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Vehicle does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Vehicle.updateOne({ _id: vehicleId }, newVehicle);

            return new ResponseStructure(
                true,
                200,
                'Vehicle Record Updated Successfully.',
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

    /* The `getAllVehicles` method is a public method of the `VehicleService` class. It is an asynchronous
    function that retrieves a list of vehicles based on the provided search criteria and pagination
    parameters. */
    public getAllVehicles = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllVehicles in VehicleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {


            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            vehicle_class: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            manufacturer: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            name: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            model: {
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
                if (OrderBy == 'cargo_capacity') order.cargo_capacity = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'consumables') order.consumables = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'crew') order.crew = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'manufacturer') order.manufacturer = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'max_atmosphering_speed') order.max_atmosphering_speed = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'model') order.model = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'name') order.name = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'vehicle_class') order.vehicle_class = Ordering == 'ASC' ? 1 : -1;
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
            let vehicles: any = await Vehicle.aggregate([
                searchMatch,
                pagination,
            ]);

            vehicles = {
                page: vehicles[0].page,
                totalItems: vehicles[0].total[0] ? vehicles[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Vehicles Documents Retrieved Successfully.',
                vehicles,
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

    /* The `deleteVehicle` method is a public method of the `VehicleService` class. It is an asynchronous
    function that takes an argument `vehicleId` of type `string`. */
    public deleteVehicle = async (vehicleId: string) => {
        logger.info('Inside deleteVehicle in VehicleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const vehicle: any = await Vehicle.findOne({ _id: vehicleId });

            if (!vehicle) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Vehicle does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Vehicle.deleteOne({ _id: vehicleId });

            return new ResponseStructure(
                true,
                200,
                'Vehicle Record Deleted Successfully.',
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

export default new VehicleService();