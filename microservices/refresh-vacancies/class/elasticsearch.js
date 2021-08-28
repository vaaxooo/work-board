const elasticSearch = require('elasticsearch');

const client = new elasticSearch.Client({
    host: 'localhost:9200',
    pingTimeout: 3000
});

module.exports.elasticSearch = client;