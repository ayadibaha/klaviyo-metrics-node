# Klaviyo-Metrics Node
[![npm version](https://badge.fury.io/js/klaviyo-metrics-node.png)](https://www.npmjs.com/package/klaviyo-metrics-node)
[![install size](https://packagephobia.com/badge?p=klaviyo-metrics-node)](https://packagephobia.com/result?p=klaviyo-metrics-node)
[![Open Source Helpers](https://www.codetriage.com/ayadibaha/klaviyo-node/badges/users.svg)](https://www.codetriage.com/ayadibaha/klaviyo-node)

Klaviyo-metrics node is a module to integrate Klaviyo's Metrics API easily in a NodeJS environment.

## Installation

NPM:
```bash
$ npm install klaviyo-metrics-node
```

## Usage

1- Include the library
```bash
const KlaviyoMetricsClient = require("klaviyo-metrics-node");
```

2- Create a new instance of the client
```bash
const kc = new KlaviyoMetricsClient("PRIVATE_API_KEY");
```

3- Get what you want from the Metrics API

## Examples

[All Metrics](https://github.com/ayadibaha/klaviyo-metrics-node/blob/master/samples/metrics-api/all_metrics.js)
[All Metrics Timeline](https://github.com/ayadibaha/klaviyo-metrics-node/blob/master/samples/metrics-api/all_metrics_timeline.js)
[Metric Export](https://github.com/ayadibaha/klaviyo-metrics-node/blob/master/samples/metrics-api/metric_export.js)
[Metric Timeline](https://github.com/ayadibaha/klaviyo-metrics-node/blob/master/samples/metrics-api/metric_timeline.js)

## Credits

klaviyo-node is inspired by the [python sdk](https://github.com/klaviyo/python-klaviyo) provided by the official company maintaining Klaviyo. It is intended to simplify the process for nodejs developers and give them a tool to use when integrating with Klaviyo.

## License

[MIT](LICENSE)