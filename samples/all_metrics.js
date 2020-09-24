// Import the KlaviyoClient to work with
const KlaviyoClient = require('../index');
// Create a new instance of that Client
const kc = new KlaviyoClient('pk_b9632c544bf766d3c8dada68233dbb148b');
/**
 * Get all metrics from Klaviyo
 */
kc.get_metrics(100, 0, (response) => {
    console.log(response)
});

// Data Example
/*
{
    count: 8,
        data: [
            { updated: '2020-09-24 13:06:57', name: 'Active on Site', created: '2020-09-24 13:06:57', object: 'metric', id: 'RRnsWe', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Bounced Email', created: '2020-09-24 13:06:57', object: 'metric', id: 'XeE7tF', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Clicked Email', created: '2020-09-24 13:06:57', object: 'metric', id: 'SupvyR', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Dropped Email', created: '2020-09-24 13:06:57', object: 'metric', id: 'RemqjB', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Marked Email as Spam', created: '2020-09-24 13:06:57', object: 'metric', id: 'TDNksH', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Opened Email', created: '2020-09-24 13:06:57', object: 'metric', id: 'YuGcGV', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Received Email', created: '2020-09-24 13:06:57', object: 'metric', id: 'WGgjcs', integration: [Object] },
            { updated: '2020-09-24 13:06:57', name: 'Unsubscribed', created: '2020-09-24 13:06:57', object: 'metric', id: 'VsedXc', integration: [Object] }
        ],
            next_cursor: ''
}
*/