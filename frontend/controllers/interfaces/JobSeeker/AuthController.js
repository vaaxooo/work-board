module.exports = {

    /**
     * Render interface JobSeeker Login
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    login: async function(request, response){
        response.render('jobseeker/auth/login', {
            title: "Вход в личный кабинет",
            layout: 'auth'
        });
    },

    /**
     * Render interface JobSeeker Register
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    register: async function(request, response){
        response.render('jobseeker/auth/register', {
            title: "Регистрация нового соискателя",
            layout: 'auth'
        });
    }

}