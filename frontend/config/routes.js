const express = require('express').Router();
const {
    index: appIndex,
    vacancy: appVacancy
} = require('../controllers/interfaces/AppController');



/*
* INTERFACES ROUTES
* */
express.get("/", appIndex);
express.get("/vacancies/search/:page", appIndex);
express.get("/vacancy/:vacancyID", appVacancy);


/*
* HANDLERS ROUTES
* */


module.exports.routes = express;