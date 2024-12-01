require('dotenv').config();
Console.log('DB_HOST', process.env.PORT);
const express = require("express");
const path = require("path");
const multer = require("multer");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

