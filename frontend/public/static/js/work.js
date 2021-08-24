
import {VacancyWidget} from '../../../views/components/widgets/vacancy/VacancyWidget.js'

const API_URL = "http://localhost:3000/api"
const root = document.querySelector("body");


const loadVacancies = async function () {
    let vacancy_widgets = document.getElementById("vacancy_widgets");
    vacancy_widgets.innerHTML = ""

    let vacancyList = await fetch(API_URL + "/vacancy/search");
    vacancyList = await vacancyList.json();
    let content = ``;
    for(const vacancy of vacancyList.data.documents) {
        content = content + VacancyWidget(vacancy);
    }
    vacancy_widgets.innerHTML = content + vacancy_widgets.innerHTML
    document.getElementById("vacancy-count").innerHTML = vacancyList.data.total;
}

root.addEventListener("load", loadVacancies());