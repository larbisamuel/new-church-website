const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {authenticateToken} = require ('../authorization.js')
const  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

// // Create a new user
// router.post('/register', async (req, res) => {
//     try {
//       const { staffid, password, email } = req.body;
//       const staffID = generateStaffID();
//       const hashedPassword = await hashPassword(password);
  
//       // Insert the new user into the database
//       const newUser = await pool.query('INSERT INTO users (staff_id, password, email) VALUES ($1, $2, $3) RETURNING *', [staffID, hashedPassword, email]);
  
//       // Return the new user to the client
//       res.json(newUser.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while registering a user' });
//     }
//   });
  
router.post('/register', async (req, res) => {
  try {
      const { staffId} = req.body;

      // Hash the staff ID
      const hashedStaffID = await bcrypt.hash(staffId, 10);

      // Store the hashed staff ID in the database
      const newUser = await pool.query(
          'INSERT INTO users (staff_id) VALUES ($1, $2) RETURNING *',
          [hashedStaffID]
      );

      res.json(newUser.rows[0]);
  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'An error occurred while registering a user' });
  }
});


  
  
router.get('/check-auth', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
  });
  
  
  
router.post('/login', async (req, res) => {
  try {
    
    const staff_id = req.body.staff_id;
  
    // Find the user in the database based on the staff ID.
    const user = await pool.query('SELECT * FROM users WHERE staff_id = $1', [staff_id]);
  
    // If user is not found, return an error.
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    
    // Generate a JWT token for the user.
    const accessToken = jwt.sign(
      { userId: user.rows[0].id, staff_id: user.rows[0].staff_id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' } 
    );
  
    //Generate a refresh token
    const refreshToken = jwt.sign(
      { userId: user.rows[0].id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '2m' } 
    );
    
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.json({ accessToken, refreshToken });
  
    
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'An error occurred while logging in' });
  }
  });
  
router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.status(401).json({ error: 'Null refresh token' });
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      const accessToken = jwt.sign(
        { userId: user.userId, staff_id: user.staff_id }, // Correct the variable names here
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } 
      );
      const newRefreshToken = jwt.sign(
        { userId: user.userId }, // Correct the variable name here
        REFRESH_TOKEN_SECRET,
        { expiresIn: '2m' } 
      );
      
      res.cookie('refresh_token', newRefreshToken, { httpOnly: true });
      res.json({ accessToken, refreshToken: newRefreshToken }); // Use newRefreshToken here
  
    })
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
  });
  
  router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'refresh token deleted' })
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
  })


  module.exports = router;