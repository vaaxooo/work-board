export const VacancyWidget = function (vacancy) {
    return `<div class="vacancy-block">
                <div class="vacancy-title">
                    ${generateHotBadge(vacancy.hot)}    
                    ${vacancy.name} 
                </div>
                <div class="vacancy-info row">
                    <div class="col-md-5">
                        <span class="vacancy-company">
                            <span class="material-icons icon">location_city</span>
                            Компания: <b>${vacancy?.companyName || "не указана"}</b>
                        </span>
                    </div>
                    <div class="col-md-7">
                        <span class="vacancy-city">
                            <span class="material-icons icon">fmd_good</span>
                            Город: <b>${vacancy?.cityName || "не указан"}</b>
                        </span>
                    </div>
                </div>
                <div class="vacancy-subtitle row">
                    <div class="col-md-5">
                        <span class="vacancy-date-publication">
                            <span class="material-icons icon">access_time_filled</span>
                            Опубликовано: <b>${vacancy.dateTxt}</b>
                        </span>
                    </div>
                    <div class="col-md-7">
                        <span class="vacancy-salary">
                            <span class="material-icons icon">attach_money</span>
                            Зарплата: ${generateSalary(vacancy.salaryFrom, vacancy.salaryTo, vacancy.salary, vacancy.salaryComment)}
                        </span>
                    </div>
                </div>
                <div class="vacancy-short-description">
                    ${vacancy.shortDescription}
                    <div class="vacancy-tags">
                        ${generateBadges(vacancy.badges)}
                    </div>
                    
                    ${generateBanner(vacancy.designBannerUrl)}
                    
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
        salaryContent = `<b>${salaryFrom}</b>-<b>${salaryTo}</b> грн.`;
    } else if(salaryFrom && !salaryTo) {
        salaryContent = `от <b>${salaryFrom}</b> грн.`;
    } else if(!salaryFrom && salaryTo) {
        salaryContent = `до <b>${salaryTo}</b> грн.`;
    } else if(!salaryFrom && salaryTo) {
        salaryContent = `до <b>${salaryTo}</b> грн.`;
    } else if(!salaryFrom && !salaryTo && salary > 0) {
        salaryContent = `<b>${salary}</b> грн.`;
    } else if(!salaryFrom && !salaryTo && !salary) {
        salaryContent = `<b>по договорености</b>`;
    }

    if(salaryComment) {
        salaryContent = salaryContent + " (" + salaryComment + ")";
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
        return `<span class="fi-hot"></span>`
    }
    return "";
}

const generateBanner = function (banner) {
    if(banner) {
        return `<div class="vacancy-banner row">
                    <img src="${banner}" alt="banner" class="vacancy-banner-preview" />
                </div>`;
    }
    return "";
}