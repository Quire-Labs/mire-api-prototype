const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = require('express')();
const routes = require('./api/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//this is a logger middleware
app.use(morgan('combined'))

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
