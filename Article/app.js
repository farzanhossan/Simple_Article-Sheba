const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const mysql = require('mysql');


const userRoutes = require('./api/routes/users');
const categoryRoutes = require('./api/routes/categories');
const articleRoutes = require('./api/routes/articles');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json())
// app.use(mysql);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/articles', articleRoutes);


app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
})

module.exports = app;