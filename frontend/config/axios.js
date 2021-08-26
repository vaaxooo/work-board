'use strict'

const { apiErrorLog, apiLogger } = require('./logger');

const axios = require('axios').create({
    baseURL: 'http://127.0.0.1:3002/api',
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