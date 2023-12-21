import express from 'express';
import VehicleController from '@src/controller/VehicleController';

const VehicleRouter = express.Router();


/**
 * @openapi
 * /vehicle/create:
 *   post:
 *     tags:
 *       - Vehicle
 *     summary: Create Vehicle Record.
 *     description: API used to Create Vehicle Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle Record Created Successfully.
 *       409:
 *         description: This Vehicle already Exist.
 */
VehicleRouter.post('/create', VehicleController.createVehicle);

/**
 * @openapi
 * /vehicle/getAllVehicles:
 *   get:
 *     tags:
 *       - Vehicle
 *     summary: Get All Vehicles.
 *     description: API used to Get All Vehicles...
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
 *             - cargo_capacity
 *             - consumables
 *             - crew
 *             - manufacturer
 *             - max_atmosphering_speed
 *             - model
 *             - name
 *             - vehicle_class
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Vehicles Retrieved Successfully.
 *       409:
 *         description: No Vehicles Exist in the Database.
 */
VehicleRouter.get('/getAllVehicles', VehicleController.getAllVehicles);

/**
 * @openapi
 * /vehicle/getVehicleById/{vehicleId}:
 *   get:
 *     tags:
 *       - Vehicle
 *     summary: Get Vehicle By Id.
 *     description: API used to get Vehicle By Id...
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Vehicle Retrieved Successfully By Id.
 *       409:
 *         description: This Vehicle does not Exist.
 */
VehicleRouter.get('/getVehicleById/:vehicleId', VehicleController.getVehicleById);

/**
 * @openapi
 * /vehicle/update/{vehicleId}:
 *   put:
 *     tags:
 *       - Vehicle
 *     summary: Update Vehicle Record.
 *     description: API used to update Vehicle Record...
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle Record Updated Successfully.
 *       409:
 *         description: This Vehicle does not Exist.
 */
VehicleRouter.put('/update/:vehicleId', VehicleController.updateVehicle);

/**
 * @openapi
 * /vehicle/delete/{vehicleId}:
 *   delete:
 *     tags:
 *       - Vehicle
 *     summary: Delete Vehicle Record.
 *     description: API used to delete Vehicle Record...
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Vehicle Record Deleted Successfully.
 *       409:
 *         description: This Vehicle does not Exist.
 */
VehicleRouter.delete('/delete/:vehicleId', VehicleController.deleteVehicle);

export default VehicleRouter;