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

        try {
            const {statistic, data, cities, rubrics} = await sendRequest("/vacancy/search", {
                page: request.params?.page ? +request.params?.page : 1,
                searchQueryString: request.query?.searchQueryString ? request.query?.searchQueryString : false,
                searchCity: request.query?.searchCity ? request.query?.searchCity : false,
                rubric: request.query?.rubric ? request.query?.rubric : false,
                scheduleId: request.query?.scheduleId ? request.query?.scheduleId : false,
                salaryFrom: request.query?.salaryFrom ? request.query?.salaryFrom : false
            });

            let content = ``
            if(data.length > 0){
                for(const key in data) {
                    const {_source: vacancy} = data[key];
                    content = content + VacancyHorizontalBlock(vacancy);
                }
            } else {
                content = `<div class="vacancies-empty">
                                <img src="/images/empty.png" width="50%" />
                                <h5 class="vacancies-empty title">Список вакансий пуст.. Попробуйте изменить фильтр!</h5>
                            </div>`
            }


            response.render('app/index', {
                title: "Поиск вакансий",
                search: VacancySearch(statistic, cities),
                filter: VacancyFilter(rubrics),
                pagination: VacancyPagination(statistic.total, request.params?.page ? request.params?.page : 1),
                content
            });
        } catch (error) {
            throw Error(error);
        }
    },

    /**
     * Vacancy page info
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    vacancy: async function (request, response) {

        try {
            let {data, recommendedVacancies} = await sendRequest("/vacancy/" + request.params.vacancyID);

            const {_source: vacancy} = data[0];

            moment.locale('ru');
            vacancy.dateTxt = moment(vacancy.date).fromNow();
            vacancy.date = moment(vacancy.date).format("Do MMM YYYY");
            vacancy.salary = generateSalary(vacancy.salaryFrom, vacancy.salaryTo, vacancy.salary, vacancy.salaryComment);

            response.render('app/vacancy', {
                title: vacancy.name,
                vacancy: vacancy,
                recommendedVacancies: recommendedVacancies
            });
        } catch (error) {
            throw Error(error);
        }
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