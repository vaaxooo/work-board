'use strict'

const router = require('express')();
const {
    vacancySearch,
    vacancy,
    getCitiesList,
    getRubricsList
} = require('../controllers/Api');


router.get('/api/vacancy/search', vacancySearch);
router.get('/api/vacancy/:id', vacancy);

router.get('/api/dictionary/getCitiesList', getCitiesList);
router.get('/api/dictionary/getRubricsList', getRubricsList);

module.exports.routes = router;