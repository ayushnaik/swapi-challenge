import express from 'express';
import FilmController from '@src/controller/FilmController';

const FilmRouter = express.Router();


/**
 * @openapi
 * /film/create:
 *   post:
 *     tags:
 *       - Film
 *     summary: Create Film Record.
 *     description: API used to Create Film Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: Film Record Created Successfully.
 *       409:
 *         description: This Film already Exist.
 */
FilmRouter.post('/create', FilmController.createFilm);

/**
 * @openapi
 * /film/getAllFilms:
 *   get:
 *     tags:
 *       - Film
 *     summary: Get All Films.
 *     description: API used to Get All Films...
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
 *             - title
 *             - director
 *             - episode_id
 *             - producer
 *             - release_date
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Films Retrieved Successfully.
 *       409:
 *         description: No Films Exist in the Database.
 */
FilmRouter.get('/getAllFilms', FilmController.getAllFilms);

/**
 * @openapi
 * /film/getFilmById/{filmId}:
 *   get:
 *     tags:
 *       - Film
 *     summary: Get Film By Id.
 *     description: API used to get Film By Id...
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Film Retrieved Successfully By Id.
 *       409:
 *         description: This Film does not Exist.
 */
FilmRouter.get('/getFilmById/:filmId', FilmController.getFilmById);

/**
 * @openapi
 * /film/update/{filmId}:
 *   put:
 *     tags:
 *       - Film
 *     summary: Update Film Record.
 *     description: API used to update Film Record...
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: Film Record Updated Successfully.
 *       409:
 *         description: This Film does not Exist.
 */
FilmRouter.put('/update/:filmId', FilmController.updateFilm);

/**
 * @openapi
 * /film/delete/{filmId}:
 *   delete:
 *     tags:
 *       - Film
 *     summary: Delete Film Record.
 *     description: API used to delete Film Record...
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Film Record Deleted Successfully.
 *       409:
 *         description: This Film does not Exist.
 */
FilmRouter.delete('/delete/:filmId', FilmController.deleteFilm);

export default FilmRouter;