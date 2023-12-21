import express from 'express';
import SpeciesController from '@src/controller/SpeciesController';

const SpeciesRouter = express.Router();


/**
 * @openapi
 * /species/create:
 *   post:
 *     tags:
 *       - Species
 *     summary: Create Species Record.
 *     description: API used to Create Species Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Species'
 *     responses:
 *       200:
 *         description: Species Record Created Successfully.
 *       409:
 *         description: This Species already Exist.
 */
SpeciesRouter.post('/create', SpeciesController.createSpecies);

/**
 * @openapi
 * /species/getAllSpeciess:
 *   get:
 *     tags:
 *       - Species
 *     summary: Get All Speciess.
 *     description: API used to Get All Speciess...
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
 *             - average_height
 *             - average_lifespan
 *             - classification
 *             - designation
 *             - language
 *             - skin_colors
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Speciess Retrieved Successfully.
 *       409:
 *         description: No Speciess Exist in the Database.
 */
SpeciesRouter.get('/getAllSpeciess', SpeciesController.getAllSpeciess);

/**
 * @openapi
 * /species/getSpeciesById/{speciesId}:
 *   get:
 *     tags:
 *       - Species
 *     summary: Get Species By Id.
 *     description: API used to get Species By Id...
 *     parameters:
 *       - in: path
 *         name: speciesId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Species Retrieved Successfully By Id.
 *       409:
 *         description: This Species does not Exist.
 */
SpeciesRouter.get('/getSpeciesById/:speciesId', SpeciesController.getSpeciesById);

/**
 * @openapi
 * /species/update/{speciesId}:
 *   put:
 *     tags:
 *       - Species
 *     summary: Update Species Record.
 *     description: API used to update Species Record...
 *     parameters:
 *       - in: path
 *         name: speciesId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Species'
 *     responses:
 *       200:
 *         description: Species Record Updated Successfully.
 *       409:
 *         description: This Species does not Exist.
 */
SpeciesRouter.put('/update/:speciesId', SpeciesController.updateSpecies);

/**
 * @openapi
 * /species/delete/{speciesId}:
 *   delete:
 *     tags:
 *       - Species
 *     summary: Delete Species Record.
 *     description: API used to delete Species Record...
 *     parameters:
 *       - in: path
 *         name: speciesId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Species Record Deleted Successfully.
 *       409:
 *         description: This Species does not Exist.
 */
SpeciesRouter.delete('/delete/:speciesId', SpeciesController.deleteSpecies);

export default SpeciesRouter;