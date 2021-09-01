'use strict'

const {elasticSearch} = require('../class/elasticsearch');
const {sendRequest} = require('../class/axios');


const {VacancySearchFilter} = require("./widgets/VacancySearchFilter");

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



    const cities = await elasticSearch.search({
        index: 'cities',
        body: {
            size: 10000,
            query: {
                match_all: {}
            }
        }
    });

    const rubrics = await elasticSearch.search({
        index: 'rubrics',
        body: {
            size: 10000,
            query: {
                match_all: {}
            }
        }
    });

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

    response.send({
        status: true,
        data: jobInfo.hits.hits || []
    })
    return false;
}

module.exports = {
    vacancySearch,
    vacancy
}