const express = require('express');
const app = express();

const path = require('path');
const csrf = require('csurf');
const expressSession = require('express-session');


const createSessionCongif = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrfToken');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');



const authRoute = require('./routes/auth.route');
const generalRoute = require('./routes/general.route');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.use(expressSession(createSessionCongif()));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);


app.use(generalRoute);
app.use(authRoute);




app.use(errorHandlerMiddleware);



db.connectToDatabase().then(function(){
    // console.log('Connected to database and listen the server sucessfully!');
    app.listen(3000);
}).catch(function() {
    console.log(error);
    console.log('Could not connect to database and listen the server!');
})
