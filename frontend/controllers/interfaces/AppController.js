const {sendRequest} = require('../../config/axios');
const {VacancyHorizontalBlock} = require('../../views/components/widgets/vacancy/VacancyHorizontalBlock');
const {VacancySearch} = require('../../views/components/widgets/vacancy/VacancySearch');
const {VacancyFilter} = require('../../views/components/widgets/vacancy/VacancyFilter');
const {VacancyPagination} = require('../../views/components/widgets/vacancy/VacancyPagination');

module.exports = {

    /**
     * @param request
     * @param response
     */
    index: async function (request, response) {
        const page = request.params?.page;
        const searchQueryString = request.query?.searchQueryString;

        const {statistic, data, cities} = await sendRequest("/vacancy/search", {
            page: page ? +page : 1,
            searchQueryString: searchQueryString ? searchQueryString : null
        });

        let content = ``
        for(const {_source: vacancy} of data) {
            content = content + VacancyHorizontalBlock(vacancy);
        }

        response.render('app/index', {
            title: "Поиск вакансий",
            search: VacancySearch(statistic, cities),
            filter: VacancyFilter(),
            pagination: VacancyPagination(statistic.total, page ? page : 1),
            content
        });
    }

}