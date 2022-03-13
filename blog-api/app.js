const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const charactersRoutes = require('./routes/characters');
const movesRoutes = require('./routes/moves');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});

const connectDB = require('./config/db');
connectDB();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
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

app.use('/characters', charactersRoutes);
app.use('/moves', movesRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);

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