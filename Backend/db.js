const { Pool } = require('pg');


const dotenv = require('dotenv');

dotenv.config(); // This loads the variables from your .env file

const pool = new Pool({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST, 
    database: process.env.DB_DATABASE, 
    password: process.env.DB_ROOT_PASSWORD, 
    port: process.env.DB_PORT 
});

module.exports = pool; // Export the pool for use in route files
