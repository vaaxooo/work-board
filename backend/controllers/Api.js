'use strict'

const {elasticSearch} = require('../class/elasticsearch');
const {sendRequest} = require('../class/axios');

const {VacancySearchFilter} = require("./widgets/VacancySearchFilter");
const {VacancyRecommended} = require("./widgets/VacancyRecommended");

const {
    getAllCities,
    getAllRubrics
} = require('./Methods');

/**
 * Returns a list with information about vacancies
 * @param request
 * @param response
 * @returns {Promise<boolean>}
 */
async function vacancySearch(request, response) {
    const {
        searchQueryString,
        page
    } = request.query;

    const offset = (30 * +page) - 30;
    const limit = 30;

    const filter = VacancySearchFilter(request.query);

    const jobsList = await elasticSearch.search({
        index: 'vacancies',
        body: {
            from: offset,
            size: limit,
            query: {
                bool: {
                    should: {
                        match_all: {}
                    },

                    filter: filter

                }
            },
            sort: [
                {date: "desc"},
            ]
        }
    });

    const cities = await getAllCities();
    const rubrics = await getAllRubrics();

    response.send({
        status: true,
        statistic: {
            type: searchQueryString !== 'false' ? 'search' : 'list',
            total: jobsList.hits.total.value,
            query: searchQueryString
        },
        data: jobsList.hits.hits || [],
        cities: cities.hits.hits || [],
        rubrics: rubrics.hits.hits || []
    })
    return false;

}

/**
 * Returns information about a specific job
 * @param request
 * @param response
 * @returns {Promise<boolean>}
 */
async function vacancy(request, response) {

    const jobInfo = await elasticSearch.search({
        index: 'vacancies',
        body: {
            query: {
                term: {
                    id: request.params.id
                }
            }
        }
    });

    const {_source: JobData} = jobInfo.hits.hits[0];

    const filter = VacancyRecommended(JobData);

    const recommendedVacancies = await elasticSearch.search({
        index: 'vacancies',
        body: {
            size: 5,
            query: {
                bool: {
                    should: {
                        match_all: {}
                    },

                    filter: filter

                }
            },
            sort: [
                {date: "desc"},
            ]
        }
    });

    response.send({
        status: true,
        data: jobInfo.hits.hits || [],
        recommendedVacancies: recommendedVacancies.hits.hits || []
    })
    return false;
}


/**
 * Get cities list
 * @param request
 * @param response
 * @returns {Promise<boolean>}
 */
async function getCitiesList(request, response) {
    const cities = await getAllCities();
    response.send({
        status: true,
        data: cities.hits.hits || []
    });
    return false;
}

/**
 * Get rubrics list
 * @param request
 * @param response
 * @returns {Promise<boolean>}
 */
async function getRubricsList(request, response) {
    const rubrics = await getAllRubrics();
    response.send({
        status: true,
        data: rubrics.hits.hits || []
    });
    return false;
}


module.exports = {
    vacancySearch,
    vacancy,
    getCitiesList,
    getRubricsList
}