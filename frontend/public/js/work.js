/*
import {VacancyHorizontalBlock} from '/widgets/vacancy/VacancyHorizontalBlock.js';

const API_URL = "http://127.0.0.1:3000/api"
const root = document.querySelector("body");


const loadVacancies = async function () {
    let vacancy_widgets = document.getElementById("vacancy_widgets");
    vacancy_widgets.innerHTML = ""

    let vacancyList = await fetch(API_URL + "/vacancy/search");
    vacancyList = await vacancyList.json();
    let content = ``;
    for(const vacancy of vacancyList.data.documents) {
        content = content + VacancyHorizontalBlock(vacancy);
    }
    vacancy_widgets.innerHTML = content + vacancy_widgets.innerHTML
}

root.addEventListener("load", loadVacancies());*/
