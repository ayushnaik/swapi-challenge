import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import Starship from '@src/models/Starship';
const { getNamespace } = require("cls-hooked");

class StarshipService {
    /* The `createStarship` method is a public method of the `StarshipService` class. It is an asynchronous
    function that takes an argument `newStarship` of type `any`. */
    public createStarship = async (newStarship: any) => {
        logger.info('Inside createStarship in StarshipService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const starshipExist: any = await Starship.findOne({ url: newStarship.url });

            if (starshipExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Starship already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const starship = new Starship(newStarship);

            await starship.save();

            return new ResponseStructure(
                true,
                200,
                'Starship Record Created Successfully.',
                starship,
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

    /* The `getStarshipById` method is a public method of the `StarshipService` class. It is an asynchronous
    function that takes an argument `starshipId` of type `string`. */
    public getStarshipById = async (starshipId: string) => {
        logger.info('Inside getStarshipById in StarshipService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const starship: any = await Starship.findOne({ _id: starshipId });

            if (!starship) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Starship does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Starship Record Created Successfully.',
                starship,
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

    /* The `updateStarship` method is a public method of the `StarshipService` class. It is an asynchronous
    function that takes two arguments: `starshipId` of type `string` and `newStarship` of type `any`. */
    public updateStarship = async (starshipId: string, newStarship: any) => {
        logger.info('Inside updateStarship in StarshipService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const starship: any = await Starship.findOne({ _id: starshipId });

            if (!starship) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Starship does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Starship.updateOne({ _id: starshipId }, newStarship);

            return new ResponseStructure(
                true,
                200,
                'Starship Record Updated Successfully.',
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

    /* The `getAllStarships` method is a public method of the `StarshipService` class. It is an asynchronous
    function that retrieves a list of starships based on the provided search criteria and pagination
    parameters. */
    public getAllStarships = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllStarships in StarshipService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {


            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            starship_class: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            MGLT: {
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
                if (OrderBy == 'MGLT') order.MGLT = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'cargo_capacity') order.cargo_capacity = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'consumables') order.consumables = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'crew') order.crew = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'hyperdrive_rating') order.hyperdrive_rating = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'manufacturer') order.manufacturer = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'max_atmosphering_speed') order.max_atmosphering_speed = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'model') order.model = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'name') order.name = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'starship_class') order.starship_class = Ordering == 'ASC' ? 1 : -1;
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
            let starships: any = await Starship.aggregate([
                searchMatch,
                pagination,
            ]);

            starships = {
                page: starships[0].page,
                totalItems: starships[0].total[0] ? starships[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Starships Documents Retrieved Successfully.',
                starships,
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

    /* The `deleteStarship` method is a public method of the `StarshipService` class. It is an asynchronous
    function that takes an argument `starshipId` of type `string`. */
    public deleteStarship = async (starshipId: string) => {
        logger.info('Inside deleteStarship in StarshipService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const starship: any = await Starship.findOne({ _id: starshipId });

            if (!starship) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Starship does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Starship.deleteOne({ _id: starshipId });

            return new ResponseStructure(
                true,
                200,
                'Starship Record Deleted Successfully.',
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

export default new StarshipService();