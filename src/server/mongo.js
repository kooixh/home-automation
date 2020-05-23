const config = require('config');


let MongoClient = require('mongodb').MongoClient;
let url = config.mongoDB.url;

module.exports = {
    MongoClient : MongoClient,
    mongoUrl : url
};