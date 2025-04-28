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
 *         description: Anteckningen uppdaterad
 */
// Put ändra en anteckning
router.put ('/:id', updateNote);
/**
 * @swagger
 * /api/notes/{id}:
 *  delete:
 *      summary: Tar bort befintlig anteckning för den inloggade användaren
 *      tags: [Notes]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Anteckning borttagen
 */
// DELETE för att ta bort en anteckning
router.delete ('/:id', deleteNote);

router.get ('/search', searchNotes);

module.exports = router;