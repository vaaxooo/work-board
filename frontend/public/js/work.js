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
    queryParams = Object.assign({}, {searchQueryString}, queryParams);
    window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
}

/**
 * Pagination redirect generate
 * @param url
 */
function redirect(url) {
    window.location.href = url + "?" + encodeQueryData(getUrlParams());
}


const searchInput = document.getElementById('searchQueryString');
if (searchInput) {
    searchInput.value = getUrlParams()?.searchQueryString ? getUrlParams()?.searchQueryString : "";
}

const searchInputCity = document.getElementById('searchCity');
if (searchInputCity) {
    searchInputCity.value = getUrlParams()?.searchCity ? getUrlParams()?.searchCity : "";
}


const searchCitySelect = document.getElementById('searchCity');

if (searchCitySelect) {
    searchCitySelect.addEventListener('change', function () {
        let queryParams = getUrlParams();
        if (getUrlParams().hasOwnProperty('searchCity')) {
            delete queryParams.searchCity;
        }
        queryParams = Object.assign({}, queryParams,{searchCity: searchCitySelect.value});
        window.location.href = '/vacancies/search/1' + "?" + encodeQueryData(queryParams);
    });
}


