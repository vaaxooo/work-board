const {sendRequest} = require('../class/axios');

/**
 * Returns a list with information about vacancies
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
async function vacancySearch(request, response, next) {
    const jobsList = await sendRequest('/vacancy/search', 'GET', {
        count: 30,
        ukrainian: true
    });
    response.send({
        status: true,
        data: jobsList || []
    });
    next();
}

/**
 * Returns information about a specific job
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
async function vacancy(request, response, next) {
    const jobInfo = await sendRequest('/vacancy', 'GET', {
        id: +request.params.id,
        ukrainian: true
    });
    response.send({
        status: true,
        data: jobInfo || []
    })
    next();
}

module.exports = {
    vacancySearch,
    vacancy
}