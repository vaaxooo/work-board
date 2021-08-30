module.exports.VacancySearch = function (params, cities) {
    return `<div class="row block-search">
                <div class="row py-5">
                    <div class="block-search-title">
                        Помогаем найти работу, с которой жизнь будет в радость
                        ${generationSubtitle(params)}
                    </div>
                    <div class="input-group">
                        <div class="col-md-7">
                            <input type="text" class="form-control form-control-lg input-search" placeholder="Кем хотите работать?" name="searchQueryString" id="searchQueryString" required/>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select form-select-lg input-search-city custom-select" id="searchCity">
                                ${generationCitiesList(cities)}
                            </select>
                        </div>
                        <div class="col-md-1">
                            <button type="submit" onclick="searchVacancies()" class="btn btn-blue btn-block btn-lg">Найти</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

/**
 * Generate subtitle Search block
 * @param params
 * @returns {string}
 */
function generationSubtitle(params) {
    if(params.type === "search") {
        if(params.total === 0) {
            return `<span class="block-search-subtitle">По запросу "<b>${params.query}</b>" вакансий не найдено!</span>`;
        }
        return `<span class="block-search-subtitle">По запросу "<b>${params.query}</b>" найдено <b>${params.total}</b> актуальних вакансий.</span>`;
    }
    return `<span class="block-search-subtitle">Сейчас у нас <b>${params.total}</b> актуальних вакансий.</span>`;
}

/**
 * Generate cities list
 * @param cities
 * @returns {string}
 */
function generationCitiesList(cities) {
    content = `<option value="" selected>Выберите город</option>`;
    for(const {_source: city} of cities) {
        content += `<option value="${city.ru}" onclick="searchCity()">${city.ru} `;
        if(city.regionName.ru){
            content += `<small>(${city.regionName.ru})</small>`;
        }
        content += `</option>`;
    }
    return content;
}