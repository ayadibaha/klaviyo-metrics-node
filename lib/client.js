const patterns = require('./patterns');
const units = require('./units');
const Request = require('./request');

/**
 * API Wrapper for Klaviyo's metrics API
 * From: https://www.klaviyo.com/docs/api/metrics
 */
module.exports = class KlaviyoClient {
    /**
     * 
     * @param {string} private_api_key 
     */
    constructor(private_api_key) {
        this.api_key = private_api_key;
        this.client = new Request();
    }

    /**
     * 
     * @param {int} limit 
     * @param {int} page 
     * @param {function} onSuccess 
     */
    get_metrics(limit = 50, page = 0, onSuccess) {

        if (!Number.isInteger(limit)) {
            throw (`'limit' parameter need to be an integer!`);
        }

        if (!Number.isInteger(page)) {
            throw (`'page' parameter need to be an integer!`);
        }

        const params = { 'api_key': this.api_key, 'page': page, 'count': limit };
        this.client.get(patterns.metrics, params, onSuccess);
    }
    /**
     * 
     * @param {string} since 
     * @param {int} limit 
     * @param {string} sort 
     * @param {function} onSuccess 
     */
    get_metrics_timeline(since = new Date().toUTCString(), limit = 100, sort = 'desc', onSuccess) {

        if (!(new Date(since) instanceof Date) && !(since.match(/[0-9]{8}-[a-z]{4}-[0-9a-z]{4}-[0-9]{4}-[a-z0-9]{12}/g))) {
            throw (`'since' didn't evaluate to be a valid Date/cursor, make sure you provide a valid string or number!`)
        }

        if (!Number.isInteger(limit)) {
            throw (`'limit' parameter need to be an integer!`);
        }

        if (!(["asc", "desc"].includes(sort))) {
            throw (`'sort' should be one of these values : asc, desc `)
        }

        const since_formatted = new Date(since) instanceof Date ? Math.round((new Date(since)).getTime() / 1000) : since;

        const params = { 'api_key': this.api_key, 'since': since_formatted, 'count': limit, 'sort': sort };
        this.client.get(patterns["metrics-timeline"], params, onSuccess);
    }

    /**
     * 
     * @param {string} metric_id 
     * @param {string} since 
     * @param {int} limit 
     * @param {string} sort 
     * @param {function} onSuccess 
     */
    metric_timeline(metric_id, since = new Date().toUTCString(), limit = 100, sort = 'desc', onSuccess) {

        if (!(new Date(since) instanceof Date) && !(since.match(/[0-9]{8}-[a-z]{4}-[0-9a-z]{4}-[0-9]{4}-[a-z0-9]{12}/g))) {
            throw (`'since' didn't evaluate to be a valid Date/cursor, make sure you provide a valid string or number!`)
        }

        if (!Number.isInteger(limit)) {
            throw (`'limit' parameter need to be an integer!`);
        }

        if (!(["asc", "desc"].includes(sort))) {
            throw (`'sort' should be one of these values : asc, desc `)
        }

        const since_formatted = new Date(since) instanceof Date ? Math.round((new Date(since)).getTime() / 1000) : since;

        const params = { 'api_key': this.api_key, 'since': since_formatted, 'count': limit, 'sort': sort };
        const url = patterns["metric-timeline"].replace(':metric_id', metric_id);
        this.client.get(url, params, onSuccess);
    }
    /**
     * Method used to export events data from Klaviyo
     * 
     * @param {string} metric_id 
     * @param {function} onSuccess
     * @optional {string} start_date 
     * @optional {string} end_date 
     * @optional {string} unit 
     * @optional {string} measurement 
     * @optional {string} on 
     * @optional {string} where 
     * @optional {string} by 
     * @optional {int} limit 
     * 
     * @returns
     */
    // {
    //     metric_id: "",
    //     start_date: "",
    //     end_date: "",
    //     unit: "",
    //     measurement: "",
    //     on: "",
    //     where: "",
    //     by: "",
    //     limit: ""
    // }
    metric_export(data, onSuccess) {
        // Required params
        if(!data['metric_id']){
            throw("'metric_id' is required")
        }
        // Handle optional params
        let start_date = data['start_date'] || new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0];
        let end_date = data['end_date'] || new Date().toISOString().split("T")[0];
        let unit = data['unit'] || units.DAY;
        let measurement = data['measurement'] || 'count';
        let on = data['on'] || '';
        let where = data['where'] || '';
        let by = data['by'] || '';
        let limit = data['limit'] || 25;
        
        // 'Where' and 'by' parameters cannot be specified at the same time
        if (where !== '' && by !== '') {
            throw ("'where' and 'by' parameters cannot be specified at the same time!");
        }

        // Possible values check
        if (typeof onSuccess !== "function"){
            throw("'onSuccess' needs to be a valid function. (response)=>{console.log(response)} should be sufficient!")
        }
        if (end_date < start_date) {
            throw (`'end_date' cannot be less than 'start_date'`)
        }

        if (!(new Date(start_date) instanceof Date)) {
            throw (`'start_date' didn't evaluate to be a valid Date, make sure you provide a valid string or number!`)
        }

        if (!(new Date(end_date) instanceof Date)) {
            throw (`'end_date' didn't evaluate to be a valid Date, make sure you provide a valid string or number!`)
        }

        if (!([units.DAY, units.WEEK, units.MONTH].includes(unit))) {
            throw (`One of these values is valid for 'unit' parameter: ${units.DAY}, ${units.WEEK}, ${units.MONTH}`);
        }

        if (!(["unique", "count", "value", "sum"].includes(measurement))) {
            throw (`One of these values is valid for 'measurement' parameter: unique, count, value, sum`);
        }
        //   -d where='[["ItemCount","=",5]]'
        if (where !== '' && JSON.parse(where).length > 1) {
            throw (`Only one possible 'where' condition! The condition needs to be JSON-encoded list in this format: '[["ItemCount","=",5]]'`);
        }

        if (!Number.isInteger(limit)) {
            throw (`'limit' parameter need to be an integer!`);
        }

        let measurement_value = "";

        if (measurement === "sum") {
            if (on === "") {
                throw ("'on' parameter needs to be speciefied when using 'sum' as measurement!")
            }
            measurement_value = JSON.stringify([measurement, on]);
        } else {
            measurement_value = measurement;
        }

        let params = { 'api_key': this.api_key, 'start_date': start_date, 'end_date': end_date, 'unit': unit, 'measurement': measurement_value, 'count': limit };

        if (where !== '') {
            params = { 'api_key': this.api_key, 'start_date': start_date, 'end_date': end_date, 'unit': unit, 'measurement': measurement_value, 'where': where, 'count': limit }
        }

        if (by !== '') {
            params = { 'api_key': this.api_key, 'start_date': start_date, 'end_date': end_date, 'unit': unit, 'measurement': measurement_value, 'by': by, 'count': limit }
        }
        
        const url = patterns["metric-export"].replace(':metric_id', data['metric_id']);
        this.client.export(url, params, onSuccess);
    }
}