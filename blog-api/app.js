const express = require('express');
const app = express();
const morgan = require('morgan');

const characterRoutes = require('./api/routes/character');
const moveRoutes = require('./api/routes/move');
const postRoutes = require('./api/routes/post');
const userRoutes = require('./api/routes/user');

const dotenv = require('dotenv');
dotenv.config({path: '.api/config/config.env'});

// const connectDB = require('./config/db');
// connectDB();

app.use(morgan('dev'));

app.use('/character', characterRoutes);
app.use('/move', moveRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;