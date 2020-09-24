const axios = require('axios');
const statuses = require('./reponse-status');

module.exports = class Request {
    get(url, parameters, callback) {
        const json_content = {
            "Content-Type": "application/json"
        }
        axios.get(`${url}`, { headers: json_content, params: parameters }).then((response) => {
            switch (response.status) {
                case 403: throw (statuses.AUTH_ERROR);
                case 429: throw (statuses.LIMIT_EX);
                case 500, 503: throw (statuses.SERVER_ERROR)
                case 200:
                    if (response.data.data == {}) {
                        callback({ "count": 0 });
                    } else {
                        const refined_response = { "count": response.data.data.length, "data": response.data.data, "next_cursor": response.data.data[-1] && response.data.data[-1].next ? response.data.data[-1].next : "" };
                        callback(refined_response);
                    }
                    break;
                default: throw (response.message)
            }
        });
    }

    export(url, parameters, callback) {
        const json_content = {
            "Content-Type": "application/json"
        }
        axios.get(`${url}`, { headers: json_content, params: parameters }).then((response) => {
            switch (response.status) {
                case 403: throw (statuses.AUTH_ERROR);
                case 429: throw (statuses.LIMIT_EX);
                case 500, 503: throw (statuses.SERVER_ERROR)
                case 200:
                    if (response == {}) {
                        callback({ "count": 0 });
                    } else {
                        const refined_response = { "count": response.data.results && response.data.results.length ? response.data.results[0].data.length : 0, "data": response.data.results && response.data.results.length > 0 ? response.data.results[0].data : [], "next_cursor": "" };
                        callback(refined_response);
                    }
                    break;
                default: throw (response.message || statuses.UNHANDLED)
            }
        });
    }
}