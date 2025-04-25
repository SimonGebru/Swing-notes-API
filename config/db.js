const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Ansluten till databasen');
  } catch (error) {
    console.error('❌ Kunde inte ansluta till databasen:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;