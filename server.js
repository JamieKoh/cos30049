const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const path = require('path');

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Create a MySQL connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '38eIo(!91w2',
    database: 'group70database',
});

// Create the database tables
async function createTables() {
  try {
    const connection = await pool.getConnection();

    // Create Users table
    await connection.query(`CREATE TABLE IF NOT EXISTS Users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )`);

    // Create Categories table
    await connection.query(`CREATE TABLE IF NOT EXISTS Categories (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL
    )`);

    // Create Digital Assets table
    await connection.query(`CREATE TABLE IF NOT EXISTS DigitalAssets (
      asset_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES Categories(category_id)
    )`);

    // Create Smart Contracts table
    await connection.query(`CREATE TABLE IF NOT EXISTS SmartContracts (
      contract_id INT AUTO_INCREMENT PRIMARY KEY,
      item_id INT,
      user_id INT,
      purchase_time DATETIME,
      FOREIGN KEY (item_id) REFERENCES DigitalAssets(asset_id),
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )`);

    connection.release();
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
}

// Create the database tables on server startup
createTables();



// Route for user registration and login
app.post('/register', async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const connection = await pool.getConnection();
  
      // Check if the user already exists
      const [existingUsers] = await connection.query(
        'SELECT * FROM Users WHERE name = ? AND email = ?',
        [name, email]
      );
  
      if (existingUsers.length > 0) {
        // User exists; log them in and fetch their data
        const userId = existingUsers[0].user_id;
        const [userData] = await connection.query(
          'SELECT * FROM Users WHERE user_id = ?',
          [userId]
        );

  
        connection.release();
  
        res.status(200).json({
          message: 'User logged in successfully',
          user: userData[0],
          // Add additional user-related data here
        });
      } else {
        // User does not exist; register them
        const [result] = await connection.query(
          'INSERT INTO Users (name, email) VALUES (?, ?)',
          [name, email]
        );
  
        if (result.affectedRows === 1) {
          // New user registration
          connection.release();
          res.status(201).json({ message: 'User registered successfully' });
        } else {
          connection.release();
          res.status(500).json({ message: 'User registration failed' });
        }
      }
    } catch (error) {
      console.error('Error registering or logging in user:', error);
      res.status(500).json({ message: 'User registration or login failed' });
    }
  });
  
  // Route for asset purchase
  app.post('/purchase', async (req, res) => {
    const { userId, assetId, assetName, assetPrice } = req.body;
  
    try {
      const connection = await pool.getConnection();
  
      // Insert a record of the asset purchase into the SmartContracts table
      const [result] = await connection.query(
        'INSERT INTO SmartContracts (user_id, item_id, purchase_time) VALUES (?, ?, NOW())',
        [userId, assetId]
      );
  
      if (result.affectedRows === 1) {
        // Asset purchase successful
  
        connection.release();
  
        res.status(201).json({ message: 'Asset purchased successfully' });
      } else {
        connection.release();
        res.status(500).json({ message: 'Asset purchase failed' });
      }
    } catch (error) {
      console.error('Error purchasing asset:', error);
      res.status(500).json({ message: 'Asset purchase failed' });
    }
  });

  app.post('/purchase', async (req, res) => {
    const { userId, assetId, itemPrice } = req.body;

    try {
        const connection = await pool.getConnection();

        // Perform the purchase operation by inserting a record into the SmartContracts table
        const [result] = await connection.query(
            'INSERT INTO SmartContracts (item_id, user_id, purchase_time) VALUES (?, ?, NOW())',
            [assetId, userId]
        );

        if (result.affectedRows === 1) {
            // Purchase successful

            connection.release();
            res.status(201).json({ message: 'Asset purchased successfully' });
        } else {
            connection.release();
            res.status(500).json({ message: 'Asset purchase failed' });
        }
    } catch (error) {
        console.error('Error purchasing asset:', error);
        res.status(500).json({ message: 'Asset purchase failed' });
    }
});



  app.get('/getCategories', async (req, res) => {
    try {
      const [results] = await pool.query('SELECT * FROM Categories');
      res.json(results);
    } catch (err) {
      console.error('Error querying category table:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Define the endpoint to fetch assets
  app.get('/getAssets', async (req, res) => {
    try {
      const [results] = await pool.query('SELECT assets.name, assets.description, assets.price, Categories.category_name AS category FROM DigitalAssets AS assets INNER JOIN Categories ON assets.category_id = Categories.category_id');
      res.json(results);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
