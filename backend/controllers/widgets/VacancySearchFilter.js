module.exports = {

    VacancySearchFilter: function (params) {
        let filter = [];

        const {
            searchQueryString,
            searchCity,
            rubric,
            scheduleId
        } = params;


        if (rubric && rubric !== "false") {
            filter.push({
                match: {
                    branchName: rubric
                }
            });
        } else {
            if (searchQueryString && searchQueryString !== "false") {
                filter.push({
                    multi_match: {
                        query: searchQueryString,
                        fields: ["name", "companyName", "description"],
                    }
                });
            }
        }

        if (searchCity && searchCity !== "false") {
            filter.push({
                match: {
                    cityName: searchCity
                }
            });
        }

        if(scheduleId && scheduleId !== "false") {
            filter.push({
                match: {
                    scheduleId: scheduleId
                }
            });
        }

        return filter;
    }

}