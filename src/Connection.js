const mysql2 = require('mysql2');
require('dotenv').config();

const db = mysql2.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'Joham',
  password: process.env.DB_PASSWORD || '22100166',
  database: process.env.DB_NAME || 'PeliculasDB',
});

module.exports = db;