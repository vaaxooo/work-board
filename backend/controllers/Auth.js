const {
    getAllCities,
    getAllRubrics
} = require('./Methods');


module.exports = {

    /**
     * Get cities list
     * @param request
     * @param response
     * @returns {Promise<boolean>}
     */
    getCitiesList: async function(request, response) {
        const cities = await getAllCities();
        console.log(await getAllCities())
        return
        response.send({
            status: true,
            data: cities.hits.hits || []
        });
        return false;
    },

    /**
     * Get rubrics list
     * @param request
     * @param response
     * @returns {Promise<boolean>}
     */
    getRubricsList: async function(request, response) {
        const rubrics = await getAllRubrics();
        response.send({
            status: true,
            data: rubrics.hits.hits || []
        });
        return false;
    }

}