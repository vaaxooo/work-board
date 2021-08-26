const express = require('express').Router();
const {
    index: appIndex
} = require('../controllers/interfaces/AppController');



/*
* INTERFACES ROUTES
* */
express.get("/", appIndex);


/*
* HANDLERS ROUTES
* */


module.exports.routes = express;