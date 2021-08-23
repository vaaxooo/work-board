const { apiErrorLog, apiLogger } = require('./logger');

const axios = require('axios').create({
    baseURL: 'https://api.rabota.ua',
    headers: {
        'Accept-Language': 'ru,uk-UA;q=0.9,uk;q=0.8,en-US;q=0.7,en;q=0.6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
    }
});

/**
 * Generate params to query string.
 * @param data
 * @returns {string}
 */
const encodeQueryData = function (data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

module.exports = {

    /**
     * Send request to server
     * @param url
     * @param method
     * @param data
     * @param responseType
     * @returns {Promise<AxiosResponse<any>>}
     */
    sendRequest: function (url = "", data = {}, method = "GET", responseType = "json") {
        if(method === "GET" && data) {
            url = url + "?" + encodeQueryData(data);
        }
        return axios({
            url,
            method,
            data,
            responseType
        }).then(({data}) => {
            if (!data) {
                throw new Error(`Incorrect result (failed request)`);
            }
            return data;
        }).catch(error => {
            apiErrorLog(error)
        });
    },

};