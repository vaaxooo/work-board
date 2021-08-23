'use strict'

const {sendRequest} = require('../class/axios');

/**
 * Returns a list with information about vacancies
 * @param request
 * @param response
 * @returns {Promise<boolean>}
 */
async function vacancySearch(request, response) {
    const jobsList = await sendRequest('/vacancy/search', {
        count: 30,
        ukrainian: true
    });
    response.send({
        status: true,
        data: jobsList || []
    });
    return false;
}

/**
 * Returns information about a specific job
 * @param request
 * @param response
 * @returns {Promise<boolean>}
 */
async function vacancy(request, response) {
    const jobInfo = await sendRequest('/vacancy', {
        id: +request.params.id,
        ukrainian: true
    });
    response.send({
        status: true,
        data: jobInfo || []
    })
    return false;
}

module.exports = {
    vacancySearch,
    vacancy
}