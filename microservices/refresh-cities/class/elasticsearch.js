const elasticSearch = require('elasticsearch');

const client = new elasticSearch.Client({
    host: 'localhost:9200'
});

module.exports.elasticSearch = client;