const express = require('express').Router();
const {
    index: appIndex,
    vacancy: appVacancy
} = require('../controllers/interfaces/AppController');

const {
    login: jobseekerLogin,
    register: jobseekerRegister
} = require('../controllers/interfaces/JobSeeker/AuthController');

const {
    login: emloyerLogin,
    register: employerRegister
} = require('../controllers/interfaces/Employer/AuthController');

/*
* INTERFACES ROUTES
* */
express.get("/", appIndex);
express.get("/vacancies/search/:page", appIndex);
express.get("/vacancy/:vacancyID", appVacancy);


/* JOBSEEKER */
express.get("/jobseeker/login", jobseekerLogin);
express.get("/jobseeker/register", jobseekerRegister);


/* EMPLOYER */
express.get("/employer/login", emloyerLogin);
express.get("/employer/register", employerRegister);







/*
* HANDLERS ROUTES
* */


module.exports.routes = express;