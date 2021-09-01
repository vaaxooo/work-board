const {sendRequest} = require('../../../config/axios');

module.exports = {

    /**
     * Render interface Employer Login
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    login: async function(request, response){
        response.render('employer/auth/login', {
            title: "Вход в личный кабинет",
            layout: 'auth'
        });
    },

    /**
     * Render interface Employer Register
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    register: async function(request, response){

        const {data: cities} = await sendRequest('/dictionary/getCitiesList');

        response.render('employer/auth/register', {
            title: "Регистрация нового работодателя",
            cities: cities,
            layout: 'auth'
        });
    }

}