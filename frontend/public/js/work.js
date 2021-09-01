/*
* HELPERS
* */

/**
 * Generate params to query string.
 * @param data
 * @returns {string}
 */
const encodeQueryData = function (data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

/**
 * Result all params from URL.
 * @returns {any}
 */
function getUrlParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
}

/*
* FUNCTIONS
* */

/**
 * Search vacancies (redirect)
 */
function searchVacancies() {
    const searchQueryString = document.getElementById("searchQueryString").value;
    let queryParams = getUrlParams();
    if (getUrlParams().hasOwnProperty('searchQueryString')) {
        delete queryParams.searchQueryString;
    }

    if(searchQueryString){
        queryParams = Object.assign({}, {searchQueryString}, queryParams);
    }

    window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
}

/**
 * Search vacancies by rubric
 */
function searchVacanciesByRubric() {
    const rubrics_list = document.getElementById("rubrics_list").value

    let queryParams = getUrlParams();
    if (getUrlParams().hasOwnProperty('rubric')) {
        delete queryParams.rubric;
    }

    if(rubrics_list){
        queryParams = Object.assign({}, queryParams,{rubric: rubrics_list});
    }
    window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
}

/**
 * Change vacancies Salary
 */
function changeVacanciesSalary() {
    const salaryFrom = document.getElementById("salaryFrom").value;

    let queryParams = getUrlParams();
    if (getUrlParams().hasOwnProperty('salaryFrom')) {
        delete queryParams.salaryFrom;
    }

    if(salaryFrom){
        queryParams = Object.assign({}, queryParams,{salaryFrom});
    }
    window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
}

/**
 * Pagination redirect generate
 * @param url
 */
function redirect(url) {
    window.location.href = url + "?" + encodeQueryData(getUrlParams());
}


/*
    AUTOCOMPLETED DATA IN OBJECTS
 */
const searchInput = document.getElementById('searchQueryString');
if (searchInput) {
    searchInput.value = getUrlParams()?.searchQueryString ? getUrlParams()?.searchQueryString : "";
}

const searchInputCity = document.getElementById('searchCity');
if (searchInputCity) {
    searchInputCity.value = getUrlParams()?.searchCity ? getUrlParams()?.searchCity : "";
}

const rubrics = document.getElementById('rubrics_list');
if (rubrics) {
    rubrics.value = getUrlParams()?.rubric ? getUrlParams()?.rubric : "";
}

const salaryFrom = document.getElementById('salaryFrom');
if (salaryFrom) {
    salaryFrom.value = getUrlParams()?.salaryFrom ? getUrlParams()?.salaryFrom : "";
}


const schedulesID = document.querySelectorAll("[name='scheduleId']");
if (schedulesID && schedulesID.length > 0) {
    for(let index = 0; index < schedulesID.length; index++) {
        if(+schedulesID[index].id === +getUrlParams()?.scheduleId){
            schedulesID[index].checked = true;
        }
    }
}
/*
   END AUTOCOMPLETED DATA IN OBJECTS
 */

/**
 * Search vacancies by City.
 * @type {HTMLElement}
 */
const searchCitySelect = document.getElementById('searchCity');

if (searchCitySelect) {
    searchCitySelect.addEventListener('change', function () {
        let queryParams = getUrlParams();
        if (getUrlParams().hasOwnProperty('searchCity')) {
            delete queryParams.searchCity;
        }

        if(searchCitySelect.value){
            queryParams = Object.assign({}, queryParams,{searchCity: searchCitySelect.value});
        }
        window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
    });
}


for(let index = 0; index < schedulesID.length; index++) {
    let scheduleId = schedulesID[index];
    if(scheduleId){
        scheduleId.addEventListener('change', function () {
            let queryParams = getUrlParams();
            if (getUrlParams().hasOwnProperty('scheduleId')) {
                delete queryParams.scheduleId;
            }

            if(scheduleId.value === "on"){
                queryParams = Object.assign({}, queryParams,{scheduleId: this.id});
            }
            window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
        });
    }
}