const Note = require('../models/noteModel');

// POST Skapa anteckning
exports.createNote = async (req, res) => {
  const { title, text } = req.body;

  try {
    const newNote = new Note({
      title,
      text,
      userId: req.user.userId, 
    });

    await newNote.save();

    res.status(201).json({ message: 'Anteckning skapad!', note: newNote });
  } catch (error) {
    res.status(500).json({ message: 'Kunde inte skapa anteckning', error: error.message });
  }
};

// GET Hämta alla anteckningar för användaren
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Kunde inte hämta anteckningar', error: error.message });
  }
};