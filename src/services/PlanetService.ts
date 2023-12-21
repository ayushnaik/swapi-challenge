import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import Planet from '@src/models/Planet';
const { getNamespace } = require("cls-hooked");

class PlanetService {
    /* The `createPlanet` method is a public method of the `PlanetService` class. It is an asynchronous
    function that takes an argument `newPlanet` of type `any`. */
    public createPlanet = async (newPlanet: any) => {
        logger.info('Inside createPlanet in PlanetService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const planetExist: any = await Planet.findOne({ url: newPlanet.url });

            if (planetExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Planet already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const planet = new Planet(newPlanet);

            await planet.save();

            return new ResponseStructure(
                true,
                200,
                'Planet Record Created Successfully.',
                planet,
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

    /* The `getPlanetById` method is a public method of the `PlanetService` class. It is an asynchronous
    function that takes an argument `planetId` of type `string`. */
    public getPlanetById = async (planetId: string) => {
        logger.info('Inside getPlanetById in PlanetService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const planet: any = await Planet.findOne({ _id: planetId });

            if (!planet) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Planet does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Planet Record Created Successfully.',
                planet,
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

    /* The `updatePlanet` method is a public method of the `PlanetService` class. It is an asynchronous
    function that takes two arguments: `planetId` of type `string` and `newPlanet` of type `any`. */
    public updatePlanet = async (planetId: string, newPlanet: any) => {
        logger.info('Inside updatePlanet in PlanetService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const planet: any = await Planet.findOne({ _id: planetId });

            if (!planet) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Planet does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Planet.updateOne({ _id: planetId }, newPlanet);

            return new ResponseStructure(
                true,
                200,
                'Planet Record Updated Successfully.',
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

    /* The `getAllPlanets` method is a public method of the `PlanetService` class. It is an asynchronous
    function that retrieves a list of planets based on the provided search criteria and pagination
    parameters. */
    public getAllPlanets = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllPlanets in PlanetService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {


            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            population: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            climate: {
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
                            terrain: {
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
                if (OrderBy == 'climate') order.climate = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'diameter') order.diameter = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'gravity') order.gravity = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'name') order.name = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'orbital_period') order.orbital_period = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'population') order.population = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'rotation_period') order.rotation_period = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'surface_water') order.surface_water = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'terrain') order.terrain = Ordering == 'ASC' ? 1 : -1;
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
            let planets: any = await Planet.aggregate([
                searchMatch,
                pagination,
            ]);

            planets = {
                page: planets[0].page,
                totalItems: planets[0].total[0] ? planets[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Planets Documents Retrieved Successfully.',
                planets,
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

    /* The `deletePlanet` method is a public method of the `PlanetService` class. It is an asynchronous
    function that takes an argument `planetId` of type `string`. */
    public deletePlanet = async (planetId: string) => {
        logger.info('Inside deletePlanet in PlanetService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const planet: any = await Planet.findOne({ _id: planetId });

            if (!planet) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Planet does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Planet.deleteOne({ _id: planetId });

            return new ResponseStructure(
                true,
                200,
                'Planet Record Deleted Successfully.',
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

export default new PlanetService();