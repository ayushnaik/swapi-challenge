import express from 'express';
import StarshipController from '@src/controller/StarshipController';

const StarshipRouter = express.Router();


/**
 * @openapi
 * /starship/create:
 *   post:
 *     tags:
 *       - Starship
 *     summary: Create Starship Record.
 *     description: API used to Create Starship Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Starship Record Created Successfully.
 *       409:
 *         description: This Starship already Exist.
 */
StarshipRouter.post('/create', StarshipController.createStarship);

/**
 * @openapi
 * /starship/getAllStarships:
 *   get:
 *     tags:
 *       - Starship
 *     summary: Get All Starships.
 *     description: API used to Get All Starships...
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
 *             - MGLT
 *             - cargo_capacity
 *             - consumables
 *             - crew
 *             - hyperdrive_rating
 *             - manufacturer
 *             - max_atmosphering_speed
 *             - model
 *             - name
 *             - starship_class
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Starships Retrieved Successfully.
 *       409:
 *         description: No Starships Exist in the Database.
 */
StarshipRouter.get('/getAllStarships', StarshipController.getAllStarships);

/**
 * @openapi
 * /starship/getStarshipById/{starshipId}:
 *   get:
 *     tags:
 *       - Starship
 *     summary: Get Starship By Id.
 *     description: API used to get Starship By Id...
 *     parameters:
 *       - in: path
 *         name: starshipId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Starship Retrieved Successfully By Id.
 *       409:
 *         description: This Starship does not Exist.
 */
StarshipRouter.get('/getStarshipById/:starshipId', StarshipController.getStarshipById);

/**
 * @openapi
 * /starship/update/{starshipId}:
 *   put:
 *     tags:
 *       - Starship
 *     summary: Update Starship Record.
 *     description: API used to update Starship Record...
 *     parameters:
 *       - in: path
 *         name: starshipId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Starship Record Updated Successfully.
 *       409:
 *         description: This Starship does not Exist.
 */
StarshipRouter.put('/update/:starshipId', StarshipController.updateStarship);

/**
 * @openapi
 * /starship/delete/{starshipId}:
 *   delete:
 *     tags:
 *       - Starship
 *     summary: Delete Starship Record.
 *     description: API used to delete Starship Record...
 *     parameters:
 *       - in: path
 *         name: starshipId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Starship Record Deleted Successfully.
 *       409:
 *         description: This Starship does not Exist.
 */
StarshipRouter.delete('/delete/:starshipId', StarshipController.deleteStarship);

export default StarshipRouter;