const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./env/secretkeys/secret');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.database);
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'))

require('./env/passport')(passport);
app.use('/api/users', require('./api/users/userRoutes'));
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(400).json({ err: err });
});

app.listen(3000, () => {
  console.log('Listening on port ' + port);
});
