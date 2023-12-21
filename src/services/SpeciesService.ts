import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import Species from '@src/models/Species';
const { getNamespace } = require("cls-hooked");

class SpeciesService {
    /* The `createSpecies` method is a public method of the `SpeciesService` class. It is an asynchronous
    function that takes an argument `newSpecies` of type `any`. */
    public createSpecies = async (newSpecies: any) => {
        logger.info('Inside createSpecies in SpeciesService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const speciesExist: any = await Species.findOne({ url: newSpecies.url });

            if (speciesExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Species already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const species = new Species(newSpecies);

            await species.save();

            return new ResponseStructure(
                true,
                200,
                'Species Record Created Successfully.',
                species,
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

    /* The `getSpeciesById` method is a public method of the `SpeciesService` class. It is an asynchronous
    function that takes an argument `speciesId` of type `string`. */
    public getSpeciesById = async (speciesId: string) => {
        logger.info('Inside getSpeciesById in SpeciesService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const species: any = await Species.findOne({ _id: speciesId });

            if (!species) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Species does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Species Record Created Successfully.',
                species,
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

    /* The `updateSpecies` method is a public method of the `SpeciesService` class. It is an asynchronous
    function that takes two arguments: `speciesId` of type `string` and `newSpecies` of type `any`. */
    public updateSpecies = async (speciesId: string, newSpecies: any) => {
        logger.info('Inside updateSpecies in SpeciesService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const species: any = await Species.findOne({ _id: speciesId });

            if (!species) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Species does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Species.updateOne({ _id: speciesId }, newSpecies);

            return new ResponseStructure(
                true,
                200,
                'Species Record Updated Successfully.',
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

    /* The `getAllSpeciess` method is a public method of the `SpeciesService` class. It is an asynchronous
    function that retrieves a list of speciess based on the provided search criteria and pagination
    parameters. */
    public getAllSpeciess = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllSpeciess in SpeciesService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {


            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            classification: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            homeworld: {
                                $regex: '.*' + SearchString + '.*',
                                $options: 'i',
                            },
                        },
                        {
                            designation: {
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
                            language: {
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
                if (OrderBy == 'average_height') order.average_height = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'average_lifespan') order.average_lifespan = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'classification') order.classification = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'designation') order.designation = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'language') order.language = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'skin_colors') order.skin_colors = Ordering == 'ASC' ? 1 : -1;
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
            let speciess: any = await Species.aggregate([
                searchMatch,
                pagination,
            ]);

            speciess = {
                page: speciess[0].page,
                totalItems: speciess[0].total[0] ? speciess[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Speciess Documents Retrieved Successfully.',
                speciess,
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

    /* The `deleteSpecies` method is a public method of the `SpeciesService` class. It is an asynchronous
    function that takes an argument `speciesId` of type `string`. */
    public deleteSpecies = async (speciesId: string) => {
        logger.info('Inside deleteSpecies in SpeciesService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const species: any = await Species.findOne({ _id: speciesId });

            if (!species) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Species does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await Species.deleteOne({ _id: speciesId });

            return new ResponseStructure(
                true,
                200,
                'Species Record Deleted Successfully.',
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

export default new SpeciesService();