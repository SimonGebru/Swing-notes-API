const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Ladda miljövariabler från .env-filen
dotenv.config();

// Importera routes
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');

// Skapa appen
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Anslut till databasen
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Ansluten till databasen');
  // Starta servern
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
})
.catch((error) => {
  console.error('Kunde inte ansluta till databasen:', error.message);
});
