// Import the KlaviyoClient to work with
const KlaviyoClient = require('../index');
// Create a new instance of that Client
const kc = new KlaviyoClient('pk_b9632c544bf766d3c8dada68233dbb148b');
/**
 * Get all metrics from Klaviyo
 */

kc.metric_timeline("RRnsWe", "2020-09-01T00:00:00Z", 100, "asc", (response) => {
    console.log(response)
});
// Returned Data: { count: 0, data: [], next_cursor: '' }