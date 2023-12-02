const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/authmodal');
const { Op } = require('sequelize');

const signin = async (req, res) => {
  try {
    const {username, password } = req.body;
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: username }
        ]
      },
    });
    
    if (!existingUser) {
      // console.log("existingUser", existingUser)
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: existingUser.id, username: existingUser.username }, 'your-secret-key', {
      expiresIn: '3h',
    });
    res.status(200).json({ token, userEmail: existingUser.email, username: existingUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email information' });
    }
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });
    res.status(201).json({ message:"your account is added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  signin,
  signup,
};
