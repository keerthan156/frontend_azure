// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS for your frontend
app.use(cors()); 

// --- Database Connection ---
// These details will come from your environment variables
const dbConfig = {
    host: process.env.DB_HOST,         // jthjdb.mysql.database.azure.com
    user: process.env.DB_USER,         // appusr
    password: process.env.DB_PASSWORD, // your-password
    database: process.env.DB_NAME,     // The name of the database/schema
    port: 3306,
    // This is CRITICAL for connecting to Azure MySQL
    ssl: {
        // This enforces the SSL connection without needing a specific certificate file
        // It corresponds to your 'ssl-mode=require' setting.
        rejectUnauthorized: true 
    }
};

let dbConnection;

async function connectToDatabase() {
    try {
        dbConnection = await mysql.createPool(dbConfig);
        console.log('Successfully connected to the Azure MySQL database.');
    } catch (error) {
        console.error('--- DATABASE CONNECTION FAILED ---'); // Added for clarity
        console.error(error); // This will print the detailed error object
        // process.exit(1);  // <-- We have commented this out!
    }
}


// --- API Endpoints ---
app.get('/', (req, res) => {
    res.send('Backend API is running and ready to connect to the database!');
});

// Example: Fetch data from a 'products' table
app.get('/api/products', async (req, res) => {
    try {
        // Make sure you have a 'products' table in your database.
        const [rows] = await dbConnection.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching data from the database.');
    }
});


// --- Start Server ---
// We connect to the database when the server starts
app.listen(port, async () => {
    await connectToDatabase();
    console.log(`Server is running on port ${port}`);
});