const Note = require('../models/noteModel');

// POST Skapa anteckning
exports.createNote = async (req, res) => {
    const { title, text } = req.body;
  
    if (!title || !text) {
      return res.status(400).json({ message: 'Titel och text måste anges' });
    }
  
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

// PUT för att uppdatera anteckning
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, text } = req.body;
  
    if (!title && !text) {
      return res.status(400).json({ message: 'Du måste skicka in titel och/eller text för att uppdatera' });
    }
  
    try {
      const note = await Note.findOne({ _id: id, userId: req.user.userId });
  
      if (!note) {
        return res.status(404).json({ message: 'Anteckning hittades inte' });
      }
  
      note.title = title || note.title;
      note.text = text || note.text;
      note.modifiedAt = new Date();
  
      await note.save();
  
      res.status(200).json({ message: 'Anteckning uppdaterad', note });
    } catch (error) {
      res.status(500).json({ message: 'Kunde inte uppdatera anteckning', error: error.message });
    }
  };


  // DELETE för att ta bort en anteckning
  exports.deleteNote = async (req, res) => {
    const { id } = req.params;
  
    try {
      const note = await Note.findOneAndDelete({ _id: id, userId: req.user.userId });
  
      if (!note) {
        return res.status(404).json({ message: 'Anteckning hittades inte' });
      }
  
      res.status(200).json({ message: 'Anteckning borttagen' });
    } catch (error) {
      res.status(500).json({ message: 'Kunde inte ta bort anteckning', error: error.message });
    }
  };
  
  // GET /api/notes/search – Sök bland anteckningar på titel
exports.searchNotes = async (req, res) => {
    const { title } = req.query;
  
    if (!title) {
      return res.status(400).json({ message: 'Ingen sökterm angiven' });
    }
  
    try {
      const notes = await Note.find({
        userId: req.user.userId, 
        title: { $regex: title, $options: 'i' } // 
      });
  
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Kunde inte söka anteckningar', error: error.message });
    }
  };