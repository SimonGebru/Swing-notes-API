const express = require('express');
const router = express.Router();

const { createNote, getNotes } = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);

// GET  hämta alla anteckningar för inloggad användare
router.get('/', getNotes);

// POST skapa ny anteckning
router.post('/', createNote);

module.exports = router;