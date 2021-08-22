const axios = require('axios').create({
    baseURL: 'https://api.rabota.ua',
    headers: {
        'Accept-Language': 'ru,uk-UA;q=0.9,uk;q=0.8,en-US;q=0.7,en;q=0.6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
    }
});

module.exports = {
    sendRequest: function (url = "", method = "GET", data = [], responseType = "json") {
        return axios({
            url,
            method,
            data,
            responseType
        }).then(({data}) => {
            if (!data) {
                throw new Error(`Incorrect result (failed request)`);
            }
            if (!data.success) {
                console.error(data);
                throw new Error(`Incorrect result (failed request)`);
            }
            return data;
        }).catch(error => {
            console.log(error)
            if (error.response) {
                console.error("Api request with params %j errored with result %j", data, error.response);
            } else if (error.request) {
                console.error("Api request with params %j failed sending", data);
            } else {
                console.error("Api request %j failed with message %j", data, error.message);
            }
        });
    }
};