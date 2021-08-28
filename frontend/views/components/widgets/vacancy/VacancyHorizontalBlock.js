const moment = require('moment');
require('moment/locale/ru');

module.exports.VacancyHorizontalBlock = function (vacancy) {

    moment.locale('ru');
    vacancy.dateTxt = moment(vacancy.date).fromNow();

    return `<div class="vacancy-block">
                <div class="vacancy-title">  
                    ${vacancy.name} 
                    ${generateHotBadge(vacancy.hot)}  
                </div>
                <div class="vacancy-info row">
                    <div class="col-md-5">
                        <span class="vacancy-company">
                            <span class="material-icons icon">location_city</span>
                            <b>${vacancy?.companyName || "не указана"}</b>
                        </span>
                    </div>
                    <div class="col-md-7">
                        <span class="vacancy-city">
                            <span class="material-icons icon">access_time_filled</span>
                            <b>${vacancy.dateTxt}</b>
                        </span>
                    </div>
                </div>
                <div class="vacancy-subtitle row">
                    <div class="col-md-5">
                        <span class="vacancy-date-publication">
                            <span class="material-icons icon">fmd_good</span>
                            <b>${vacancy?.cityName || "не указан"}</b>
                        </span>
                    </div>
                    <div class="col-md-7">
                        <span class="vacancy-salary">
                            <span class="material-icons icon">attach_money</span>
                            ${generateSalary(vacancy.salaryFrom, vacancy.salaryTo, vacancy.salary, vacancy.salaryComment)}
                        </span>
                    </div>
                </div>
                <div class="vacancy-short-description">
                    ${vacancy.shortDescription}
                    <div class="vacancy-tags">
                        ${generateBadges(vacancy.badges)}
                    </div>
                    
                    ${generateBanner(vacancy.designBannerPreview)}
                    
                </div>
            </div>`;
}

/**
 * Generate Badges
 * @param badges
 * @returns {string}
 */
const generateBadges = function (badges = []) {
    let content = ``;
    for (const badge of badges) {
        content = content + `<span class="tag" data-id="${badge.id}">${badge.name}</span>`
    }
    return content;
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

/**
 * Generate badge HOT
 * @param hot
 * @returns {string|boolean}
 */
const generateHotBadge = function (hot) {
    if(hot) {
        return `<span class="material-icons hot-icon text-danger" title="Гарячая вакансия">local_fire_department</span>`;
    }
    return "";
}

/**
 * Generate banner block
 * @param banner
 * @returns {string}
 */
const generateBanner = function (banner) {
    if(banner) {
        return `<div class="vacancy-banner row">
                    <img src="${banner}" alt="banner" class="vacancy-banner-preview" />
                </div>`;
    }
    return "";
}