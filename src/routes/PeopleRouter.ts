import express from 'express';
import PeopleController from '@src/controller/PeopleController';

const PeopleRouter = express.Router();


/**
 * @openapi
 * /people/create:
 *   post:
 *     tags:
 *       - People
 *     summary: Create People Record.
 *     description: API used to Create People Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/People'
 *     responses:
 *       200:
 *         description: People Record Created Successfully.
 *       409:
 *         description: This People already Exist.
 */
PeopleRouter.post('/create', PeopleController.createPeople);

/**
 * @openapi
 * /people/getAllPeoples:
 *   get:
 *     tags:
 *       - People
 *     summary: Get All Peoples.
 *     description: API used to Get All Peoples...
 *     parameters:
 *       - in: query
 *         name: SearchString
 *         schema:
 *           $ref: '#/components/schemas/SearchString'
 *       - in: query
 *         name: PageSize
 *         schema:
 *           $ref: '#/components/schemas/PageSize'
 *         default: 20
 *       - in: query
 *         name: PageNumber
 *         schema:
 *           $ref: '#/components/schemas/PageNumber'
 *       - in: query
 *         name: OrderBy
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - birth_year
 *             - eye_color
 *             - gender
 *             - hair_color
 *             - height
 *             - homeworld
 *             - skin_color
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Peoples Retrieved Successfully.
 *       409:
 *         description: No Peoples Exist in the Database.
 */
PeopleRouter.get('/getAllPeoples', PeopleController.getAllPeoples);

/**
 * @openapi
 * /people/getPeopleById/{peopleId}:
 *   get:
 *     tags:
 *       - People
 *     summary: Get People By Id.
 *     description: API used to get People By Id...
 *     parameters:
 *       - in: path
 *         name: peopleId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: People Retrieved Successfully By Id.
 *       409:
 *         description: This People does not Exist.
 */
PeopleRouter.get('/getPeopleById/:peopleId', PeopleController.getPeopleById);

/**
 * @openapi
 * /people/update/{peopleId}:
 *   put:
 *     tags:
 *       - People
 *     summary: Update People Record.
 *     description: API used to update People Record...
 *     parameters:
 *       - in: path
 *         name: peopleId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/People'
 *     responses:
 *       200:
 *         description: People Record Updated Successfully.
 *       409:
 *         description: This People does not Exist.
 */
PeopleRouter.put('/update/:peopleId', PeopleController.updatePeople);

/**
 * @openapi
 * /people/delete/{peopleId}:
 *   delete:
 *     tags:
 *       - People
 *     summary: Delete People Record.
 *     description: API used to delete People Record...
 *     parameters:
 *       - in: path
 *         name: peopleId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: People Record Deleted Successfully.
 *       409:
 *         description: This People does not Exist.
 */
PeopleRouter.delete('/delete/:peopleId', PeopleController.deletePeople);

export default PeopleRouter;