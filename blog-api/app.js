const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const characterRoutes = require('./api/routes/character');
const moveRoutes = require('./api/routes/move');
const postRoutes = require('./api/routes/post');
const userRoutes = require('./api/routes/user');

const dotenv = require('dotenv');
dotenv.config({path: '.api/config/config.env'});

// const connectDB = require('./config/db');
// connectDB();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Change * to my website domain when finished to only allow my website to access
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    };
    next();
});

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