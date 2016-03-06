'use strict';

module.exports = {  
    apiVersion: '2.2',
    host: process.env.ELASTICSEARCH_IP || 'localhost:9200',
    log: 'trace',
};