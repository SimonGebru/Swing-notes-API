const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // 👈 Importera nya funktionen

// Routes
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');

// Init
dotenv.config();
const app = express();

// Anslut till databasen
connectDB(); 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Starta servern
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(` Servern körs på port ${PORT}`));
