const {elasticSearch} = require('../class/elasticsearch');

module.exports = {

    /**
     * Get all cities
     * @returns {Promise<*>}
     */
    getAllCities: async function() {
        return await elasticSearch.search({
            index: 'cities',
            body: {
                size: 10000,
                query: {
                    match_all: {}
                }
            }
        });
    },

    /**
     * Get all rubrics
     * @returns {Promise<*>}
     */
    getAllRubrics: async function() {
        return await elasticSearch.search({
            index: 'rubrics',
            body: {
                size: 10000,
                query: {
                    match_all: {}
                }
            }
        });
    }
}