module.exports.VacancyFilter = function (rubrics) {
    return ` <div class="block-filter content">
                <div class="form-group filter-type">
                    <label for="rubrics_list" class="filter-title">Рубрики</label>
                    <select class="form-select form-select-lg input-rubrics" id="rubrics_list" onchange="searchVacanciesByRubric()">
                        ${generationRubricsList(rubrics)}
                    </select>
                </div>
    
                <form name="shedules_list" class="form-group filter-type">
                    <label  class="filter-title">Вид занятости:</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="scheduleId" id="1" data-shedule="Полная занятость">
                        <label class="form-check-label" for="1">
                            Полная занятость
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="scheduleId" id="2" data-shedule="Стажировка / практика">
                        <label class="form-check-label" for="2">
                            Стажировка / практика
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="scheduleId" id="3" data-shedule="Неполная занятость">
                        <label class="form-check-label" for="3">
                            Неполная занятость
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="scheduleId" id="4" data-shedule="Удаленная работа">
                        <label class="form-check-label" for="4">
                            Удаленная работа
                        </label>
                    </div>
                </form>
    
                <div class="form-group">
                    <label for="salaryFrom" class="filter-title">Хочу зарплату</label>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="input-group">
                                <span class="input-group-text salary-subtitle">от</span>
                                <input type="number" name="salaryFrom" id="salaryFrom" class="form-control form-control-lg input-salary">
                                <span class="input-group-text salary-subtitle">грн.</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <button type="submit" class="btn btn-blue btn-lg">OK</button>
                            </div>
                        </div>
                    </div>
    
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" value="" id="filter_noSalary">
                        <label class="form-check-label" for="filter_noSalary">
                            Показывать вакансии без з.п.
                        </label>
                    </div>
    
                </div>
            </div>`;
}

/**
 * Generation rubrics list
 * @param rubrics
 * @returns {string}
 */
function generationRubricsList(rubrics) {
    content = `<option value="" selected>Выберите рубрику</option>`;
    for(const {_source: rubric} of rubrics) {
        content += `<option value="${rubric.ru}" onclick="searchRubric()">${rubric.ru}</option>`;
    }
    return content;
}