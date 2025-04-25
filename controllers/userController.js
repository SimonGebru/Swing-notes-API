const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');


exports.signup = async (req, res) => {
  console.log("🟢 signup körs!");
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Användaren finns redan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Användare skapad!' });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Fel e-post eller lösenord' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Fel e-post eller lösenord' });
    }

    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    res.status(200).json({ message: 'Inloggning lyckades', token });
  } catch (error) {
    res.status(500).json({ message: 'Serverfel', error: error.message });
  }
};