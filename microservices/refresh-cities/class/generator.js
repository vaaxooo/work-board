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
            let {data} = await axios.get('/dictionary/cities-with-regions');
            for (const cities of data) {
                yield {
                    cities: cities
                };
            }
            page++;
            if (!data || data.length === 0) break;
        } while (true);
    } catch (e) {
        apiErrorLog(e);
    }
}

module.exports = {
    load
}