const dotenv = require('dotenv').config();


SERVER_PORT = process.env.SERVER_PORT
DB_ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD
DB_DATABASE = process.env.DB_DATABASE
DB_LOCAL_PORT = process.env.DB_LOCAL_PORT
DB_DOCKER_PORT = process.env.DB_DOCKER_PORT
DB_HOST = process.env.DB_HOST
DB_USER = process.env.DB_USER

module.exports = {
    SERVER_PORT,
    DB_DATABASE,
    DB_DOCKER_PORT,
    DB_HOST,
    DB_LOCAL_PORT,
    DB_ROOT_PASSWORD,
    DB_USER
}

