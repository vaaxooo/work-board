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
        const searchCity = request.query?.searchCity;

        const {statistic, data, cities} = await sendRequest("/vacancy/search", {
            page: page ? +page : 1,
            searchQueryString: searchQueryString ? searchQueryString : false,
            searchCity: searchCity ? searchCity : false
        });

        let content = ``
        for(const key in data) {
            const {_source: vacancy} = data[key];
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