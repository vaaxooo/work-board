'use strict';

const {apiErrorLog} = require("./logger");

const axios = require('axios').create({
    baseURL: 'https://api.rabota.ua',
    headers: {
        'Accept-Language': 'ru,uk-UA;q=0.9,uk;q=0.8,en-US;q=0.7,en;q=0.6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
    }
});

let page = 1;

async function* load() {
    try {
        do {
            let {data} = await axios.get('/vacancy/search', {
                params: {
                    page: page,
                    count: 500,
                    ukrainian: false,
                    showAgency: true,
                }
            });

            for (const vacancy of data.documents) {

                let {data: vacancyData} = await axios.get('/vacancy/', {
                    params: {
                        id: +vacancy.id
                    }
                });

                let mergedData = Object.assign({}, vacancy, vacancyData);
                mergedData.designBannerPreview = vacancy.designBannerFullUrl;

                yield {
                    vacancy: mergedData
                };
            }
            page++;
            if (!data.documents || data.documents.length === 0) break;
        } while (true);
    } catch (e) {
        apiErrorLog(e);
    }
}

module.exports = {
    load
}