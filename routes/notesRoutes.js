const express = require('express');
const router = express.Router();

const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);

// GET  hämta alla anteckningar för inloggad användare
router.get('/', getNotes);

// POST skapa ny anteckning
router.post('/', createNote);

// Put ändra en anteckning
router.put ('/:id', updateNote);

// DELETE för att ta bort en anteckning
router.delete ('/:id', deleteNote);

module.exports = router;