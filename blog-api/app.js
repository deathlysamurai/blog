const express = require('express');
const app = express();

const characterRoutes = require('./api/routes/character');
const moveRoutes = require('./api/routes/move');
const postRoutes = require('./api/routes/post');
const userRoutes = require('./api/routes/user');

const dotenv = require('dotenv');
dotenv.config({path: '.api/config/config.env'});

// const connectDB = require('./config/db');
// connectDB();

app.use('/character', characterRoutes);
app.use('/move', moveRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

module.exports = app;