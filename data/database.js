const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
     database = client.db('online-dress-shop');
}


function getDb() {
    if(!database){
        throw new Error ('Please connect to the database!');
    }
    return database;
}


module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
};
