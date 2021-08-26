const {sendRequest} = require('../../config/axios');
const {VacancyHorizontalBlock} = require('../../views/components/widgets/vacancy/VacancyHorizontalBlock');
const {VacancySearch} = require('../../views/components/widgets/vacancy/VacancySearch');

module.exports = {

    /**
     * @param request
     * @param response
     */
    index: async function (request, response) {
        const {data} = await sendRequest("/vacancy/search");
        let content = ``
        for(const vacancy of data.documents) {
            content = content + VacancyHorizontalBlock(vacancy);
        }

        response.render('app/index', {
            title: "Поиск вакансий",
            search: VacancySearch(data.total),
            content
        });
    }

}