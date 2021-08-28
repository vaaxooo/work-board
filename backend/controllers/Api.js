'use strict'

const {elasticSearch} = require('../class/elasticsearch');
const {sendRequest} = require('../class/axios');

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
    });

    const offset = (30 * +page) - 30;
    const limit = 30;
    if(searchQueryString !== 'null'){
        const jobsList = await elasticSearch.search({
            index: 'vacancies',
            body: {
                from: offset,
                size: limit,
                query: {
                    multi_match: {
                        query: searchQueryString,
                        fields: ["name", "companyName", "description"]
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
                type: 'search',
                total: jobsList.hits.total.value,
                query: searchQueryString
            },
            data: jobsList.hits.hits || [],
            cities: cities.hits.hits || []
        })
        return false;
    }

    const jobsList = await elasticSearch.search({
        index: 'vacancies',
        body: {
            from: offset,
            size: limit,
            sort: [
                {date: "desc"}
            ]
        }
    });
    response.send({
        status: true,
        statistic: {
            type: 'list',
            total: jobsList.hits.total.value
        },
        data: jobsList.hits.hits || [],
        cities: cities.hits.hits || []
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
    const jobInfo = await sendRequest('/vacancy', {
        id: +request.params.id,
        ukrainian: false
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