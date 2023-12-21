import ResponseStructure from '@src/shared/ResponseStructure';
import logger from '@src/shared/Logger';
import People from '@src/models/People';
const { getNamespace } = require("cls-hooked");

class PeopleService {
    /* The `createPeople` method is a public method of the `PeopleService` class. It is an asynchronous
    function that takes an argument `newPeople` of type `any`. */
    public createPeople = async (newPeople: any) => {
        logger.info('Inside createPeople in PeopleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const peopleExist: any = await People.findOne({ url: newPeople.url });

            if (peopleExist) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Person already Exist.',
                    {},
                    {},
                    traceId
                );
            }

            const people = new People(newPeople);

            await people.save();

            return new ResponseStructure(
                true,
                200,
                "Person's Record Created Successfully.",
                people,
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

    /* The `getPeopleById` method is a public method of the `PeopleService` class. It is an asynchronous
    function that takes an argument `peopleId` of type `string`. */
    public getPeopleById = async (peopleId: string) => {
        logger.info('Inside getPeopleById in PeopleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const people: any = await People.findOne({ _id: peopleId });

            if (!people) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Person does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            return new ResponseStructure(
                true,
                200,
                'Person Record Retrieved Successfully.',
                people,
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

    /* The `updatePeople` method is a public method of the `PeopleService` class. It is an asynchronous
    function that takes two arguments: `peopleId` of type `string` and `newPeople` of type `any`. */
    public updatePeople = async (peopleId: string, newPeople: any) => {
        logger.info('Inside updatePeople in PeopleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const people: any = await People.findOne({ _id: peopleId });

            if (!people) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Person does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await People.updateOne({ _id: peopleId }, newPeople);

            return new ResponseStructure(
                true,
                200,
                "Person's Record Updated Successfully.",
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

    /* The `getAllPeoples` method is a public method of the `PeopleService` class. It is an asynchronous
    function that retrieves a list of peoples based on the provided search criteria and pagination
    parameters. */
    public getAllPeoples = async (
        SearchString: string,
        PageSize: number,
        PageNumber: number,
        OrderBy: string,
        Ordering: string,
    ) => {
        logger.info('Inside getAllPeoples in PeopleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const searchMatch: any = { $match: {} };
            if (SearchString) {
                searchMatch.$match = {
                    $or: [
                        {
                            gender: {
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
                if (OrderBy == 'birth_year') order.birth_year = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'eye_color') order.eye_color = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'gender') order.gender = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'hair_color') order.hair_color = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'height') order.height = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'homeworld') order.homeworld = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'name') order.name = Ordering == 'ASC' ? 1 : -1;
                if (OrderBy == 'skin_color') order.skin_color = Ordering == 'ASC' ? 1 : -1;
            } else order.createdAt = 1;

            const pagination = {
                $facet: {
                    page: [
                        { $sort: order },
                        { $skip: PageSize * PageNumber },
                        { $limit: Number(PageSize && 10) },
                    ],
                    total: [{ $count: 'totalItems' }],
                },
            };
            let peoples: any = await People.aggregate([
                searchMatch,
                pagination,
            ]);

            peoples = {
                page: peoples[0].page,
                totalItems: peoples[0].total[0] ? peoples[0].total[0].totalItems : 0,
            };

            return new ResponseStructure(
                true,
                200,
                'All Peoples Documents Retrieved Successfully.',
                peoples,
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

    /* The `deletePeople` method is a public method of the `PeopleService` class. It is an asynchronous
    function that takes an argument `peopleId` of type `string`. */
    public deletePeople = async (peopleId: string) => {
        logger.info('Inside deletePeople in PeopleService');

        let traceId = getNamespace(process.env.CLS_NAMESPACE).get("traceId");

        try {
            const people: any = await People.findOne({ _id: peopleId });

            if (!people) {
                return new ResponseStructure(
                    false,
                    409,
                    'This Person does not Exist.',
                    {},
                    {},
                    traceId
                );
            }

            await People.deleteOne({ _id: peopleId });

            return new ResponseStructure(
                true,
                200,
                "Person's Record Deleted Successfully.",
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

export default new PeopleService();