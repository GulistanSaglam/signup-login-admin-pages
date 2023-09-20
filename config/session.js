const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session');

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);

    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        database: 'online-dress-shop',
        collection: 'sessions'
    });

    return store;
}


function createSessionCongif() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = createSessionCongif;