const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const assert = require('assert');
const multiparty = require('multiparty');
const session = require('express-session');
const index = require('./routes/index');


app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 20,
  },
  rolling: true,
}));

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static('public'));
app.use('/upload', express.static('upload'));
app.set('view engine', 'ejs');

app.use('/', index);
app.listen(8090);
