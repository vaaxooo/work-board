module.exports.VacancyPagination = function (total, current_page) {
    const pages = +Math.ceil(total / 30);
    if (30 < total) {
        if (total === 0 || pages <= 1) {
            return;
        }
        let content = `<nav>
                            <ul class="pagination pagination-lg justify-content-center">`;
        if (+current_page > 1) {
            content += `<li class="page-item">
                                <a class="page-link" onclick="redirect('/vacancies/search/${+current_page - 1}')" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>`;
        }

        for (let index = +current_page > 1 ? +current_page - 1 : +current_page; index < +current_page + 3; index++) {
            if(index <= pages){
                content += `<li class="page-item">
                                    <a class="page-link ${+current_page === index ? 'active' : ''}" onclick="redirect('/vacancies/search/${index}')">${index}</a>
                                </li>`;
            }
        }
        if (pages > 6) {
            content += `<span style="margin-top: 15px; padding: 0px 10px; font-weight: 600; color: #0d6efd;">...</span>
                            <li class="page-item">
                                <a class="page-link ${+current_page === pages ? 'active' : ''}" onclick="redirect('/vacancies/search/${pages}')">${pages}</a>
                            </li>`;
        }
        if (+current_page !== pages) {
            content += `<li class="page-item">
                                    <a class="page-link" onclick="redirect('/vacancies/search/${+current_page + 1}')" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>`;
        }
        content += `</ul>
                        </nav>`;
        return content;
    }

}