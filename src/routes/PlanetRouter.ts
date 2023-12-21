import express from 'express';
import PlanetController from '@src/controller/PlanetController';

const PlanetRouter = express.Router();


/**
 * @openapi
 * /planet/create:
 *   post:
 *     tags:
 *       - Planet
 *     summary: Create Planet Record.
 *     description: API used to Create Planet Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: Planet Record Created Successfully.
 *       409:
 *         description: This Planet already Exist.
 */
PlanetRouter.post('/create', PlanetController.createPlanet);

/**
 * @openapi
 * /planet/getAllPlanets:
 *   get:
 *     tags:
 *       - Planet
 *     summary: Get All Planets.
 *     description: API used to Get All Planets...
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
 *             - climate
 *             - diameter
 *             - gravity
 *             - name
 *             - orbital_period
 *             - population
 *             - rotation_period
 *             - surface_water
 *             - terrain
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Planets Retrieved Successfully.
 *       409:
 *         description: No Planets Exist in the Database.
 */
PlanetRouter.get('/getAllPlanets', PlanetController.getAllPlanets);

/**
 * @openapi
 * /planet/getPlanetById/{planetId}:
 *   get:
 *     tags:
 *       - Planet
 *     summary: Get Planet By Id.
 *     description: API used to get Planet By Id...
 *     parameters:
 *       - in: path
 *         name: planetId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Planet Retrieved Successfully By Id.
 *       409:
 *         description: This Planet does not Exist.
 */
PlanetRouter.get('/getPlanetById/:planetId', PlanetController.getPlanetById);

/**
 * @openapi
 * /planet/update/{planetId}:
 *   put:
 *     tags:
 *       - Planet
 *     summary: Update Planet Record.
 *     description: API used to update Planet Record...
 *     parameters:
 *       - in: path
 *         name: planetId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: Planet Record Updated Successfully.
 *       409:
 *         description: This Planet does not Exist.
 */
PlanetRouter.put('/update/:planetId', PlanetController.updatePlanet);

/**
 * @openapi
 * /planet/delete/{planetId}:
 *   delete:
 *     tags:
 *       - Planet
 *     summary: Delete Planet Record.
 *     description: API used to delete Planet Record...
 *     parameters:
 *       - in: path
 *         name: planetId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Planet Record Deleted Successfully.
 *       409:
 *         description: This Planet does not Exist.
 */
PlanetRouter.delete('/delete/:planetId', PlanetController.deletePlanet);

export default PlanetRouter;