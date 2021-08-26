module.exports.VacancySearch = function (total) {
    return `<div class="block-search">
                <div class="row">
                    <div class="block-search-title">
                        Помогаем найти работу, с которой жизнь будет в радость
                        <span class="block-search-subtitle">Сейчас у нас <b>${total}</b> актуальних вакансий.</span>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-lg input-search" placeholder="Кем хотите работать?" required/>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <select class="form-control form-control-lg input-search-city">
                                <option value="0" selected>Выберите город</option>
                                <option value="0512">Николаев</option>
                                <option value="5212">Киев</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-search btn-lg">Найти</button>
                    </div>
                </div>
            </div>`;
}