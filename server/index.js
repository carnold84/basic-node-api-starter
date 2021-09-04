const cors = require('cors')
const errorHandler = require('errorhandler');
const express = require('express');
const passport = require('passport');

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  require('dotenv').config();
}

const app = express();
const APP_PORT = process.env.APP_PORT || 8000;
const PATH = process.env.APP_PATH ? `/${process.env.APP_PATH}` : '';

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
app.use(passport.initialize());

// parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

if (!isProduction) {
  app.use(errorHandler());
}

require('./config/passport');
app.use(require('./routes'));

// We provide a root route just as an example
app.get(`${PATH}`, (req, res) => {
  res.send(`<p>Access Denied</p>`);
});

// start app
app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});