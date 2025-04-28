const express = require('express');
const router = express.Router();

const { createNote, getNotes, updateNote, deleteNote, searchNotes } = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);

/**
 * @swagger
 * /api/notes:
 *  get:
 *      summary: Hämta alla anteckningar för den inloggade användaren
 *      tags: [Notes]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista med anteckningar hämtades
 */
// GET  hämta alla anteckningar för inloggad användare
router.get('/', getNotes);
/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Skapa en ny anteckning för den inloggade användaren
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titeln på anteckningen
 *               text:
 *                 type: string
 *                 description: Textinnehållet i anteckningen
 *     responses:
 *       201:
 *         description: Anteckning skapad
 *       400:
 *         description: Titel och text måste anges
 *       500:
 *         description: Internt serverfel vid skapande
 */
// POST skapa ny anteckning
router.post('/', createNote);
/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Uppdaterar en befintlig anteckning för den inloggade användaren
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för anteckningen som ska uppdateras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *                 description: Ny titel på anteckningen
 *               text:
 *                 type: string
 *                 description: Nytt textinnehåll för anteckningen
 *     responses:
 *       200:
 *         description: Anteckningen har uppdaterats
 *       400:
 *         description: Titel och/eller text måste anges för att uppdatera
 *       404:
 *         description: Anteckning hittades inte
 *       500:
 *         description: Internt serverfel vid uppdatering
 */
// Put ändra en anteckning
router.put ('/:id', updateNote);
/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Tar bort en befintlig anteckning för den inloggade användaren
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för anteckningen som ska tas bort
 *     responses:
 *       200:
 *         description: Anteckning borttagen
 *       404:
 *         description: Anteckning hittades inte
 *       500:
 *         description: Internt serverfel vid borttagning
 */
// DELETE för att ta bort en anteckning
router.delete ('/:id', deleteNote);
/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Sök anteckningar efter titel för den inloggade användaren
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Titeln eller delar av titeln att söka efter
 *     responses:
 *       200:
 *         description: Lyckad sökning efter anteckningar
 *       400:
 *         description: Ingen sökterm angiven
 *       500:
 *         description: Internt serverfel vid sökning
 */
router.get ('/search', searchNotes);

module.exports = router;