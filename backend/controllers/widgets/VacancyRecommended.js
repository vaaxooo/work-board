module.exports = {

    /**
     * Get related vacancies
     * @param vacancy
     * @returns {[]}
     * @constructor
     */
    VacancyRecommended: function (vacancy) {

        const filter = [];

        for (const key in vacancy.searchTags) {
            filter.push({
                    query_string: {
                        query: vacancy.searchTags[key].name.replace(/[^a-zа-яё\s]/gi, ''),
                    }
                },
                {
                    bool: {
                        must_not: {
                            match: {
                                id: vacancy.id
                            }
                        }
                    }
                });
        }

        filter.push({
            match: {
                cityName: vacancy.cityName
            }
        });

        return filter;
    }

}