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

function searchVacancies() {
    const searchQueryString = document.getElementById("searchQueryString").value;
    window.location.href = "/vacancies/search/1?searchQueryString=" + searchQueryString;
}

function redirect(url) {
    window.location.href = url + "?" + encodeQueryData(getUrlParams());
}




const searchInput = document.getElementById('searchQueryString');
if(searchInput) {
    searchInput.value = getUrlParams()?.searchQueryString ? getUrlParams()?.searchQueryString : "";
}
