const moment = require('moment');
require('moment/locale/ru');

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

        const {statistic, data, cities, rubrics} = await sendRequest("/vacancy/search", {
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
            filter: VacancyFilter(rubrics),
            pagination: VacancyPagination(statistic.total, page ? page : 1),
            content
        });
    },

    /**
     * Vacancy page info
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    vacancy: async function (request, response) {

        let {data} = await sendRequest("/vacancy/" + request.params.vacancyID);
        const {_source: vacancy} = data[0];

        moment.locale('ru');
        vacancy.dateTxt = moment(vacancy.date).fromNow();
        vacancy.date = moment(vacancy.date).format("Do MMM YYYY");
        vacancy.salary = generateSalary(vacancy.salaryFrom, vacancy.salaryTo, vacancy.salary, vacancy.salaryComment);

        response.render('app/vacancy', {
            title: vacancy.name,
            vacancy: vacancy
        });
    }

}


/**
 * Generate Salary block
 * @param salaryFrom
 * @param salaryTo
 * @param salary
 * @param salaryComment
 * @returns {string}
 */
const generateSalary = function (salaryFrom, salaryTo, salary, salaryComment) {
    let salaryContent = ``;
    if(salaryFrom && salaryTo) {
        salaryContent = `<b>${salaryFrom}-${salaryTo} грн.</b>`;
    } else if(salaryFrom && !salaryTo) {
        salaryContent = `от <b>${salaryFrom} грн.</b>`;
    } else if(!salaryFrom && salaryTo) {
        salaryContent = `до <b>${salaryTo} грн.</b>`;
    } else if(!salaryFrom && !salaryTo && salary > 0) {
        salaryContent = `<b>${salary} грн.</b>`;
    } else if(!salaryFrom && !salaryTo && !salary) {
        salaryContent = `<b>по договорености</b>`;
    }

    if(salaryComment) {
        salaryContent = salaryContent + " <b>(" + salaryComment + ")</b>";
    }

    return salaryContent;
}