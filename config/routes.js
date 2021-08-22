const router = require('express')();
const {
    vacancySearch,
    vacancy
} = require('../controllers/Api');


router.get('/api/vacancy/search', vacancySearch);
router.get('/api/vacancy/:id', vacancy)

module.exports.routes = router;