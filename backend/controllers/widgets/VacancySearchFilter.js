module.exports = {

    VacancySearchFilter: function (params) {
        let filter = [];

        const {
            searchQueryString,
            searchCity
        } = params;

        if(searchQueryString && searchQueryString !== "false") {
            filter.push({
                multi_match: {
                    query: searchQueryString,
                    fields: ["name", "companyName", "description"],
                }
            });
        }

        if(searchCity && searchCity !== "false"){
            filter.push({
                match: {
                    cityName: searchCity
                }
            });
        }

        return filter;
    }

}