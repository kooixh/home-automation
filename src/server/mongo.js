const config = require('config');

let MongoClient = require('mongodb').MongoClient;
let url = config.mongoDB.url;

function connect(callback) {
    MongoClient.connect(url, callback);
}

module.exports = {
    mongoConnect: connect
};
