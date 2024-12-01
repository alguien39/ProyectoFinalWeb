require('dotenv').config();

const express = require("express");
const path = require("path");
const multer = require("multer");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const mysql2 = require("mysql2");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require('./src/Connection.js');
const { Console } = require('console');
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Obtener todas las peliculas
app.get('/Peliculas', (req, res) => {
    const query = 'SELECT * FROM Peliculas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            res.status(500).send('Error al obtener datos');
        } else {
            res.json(results);
        }
    });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
