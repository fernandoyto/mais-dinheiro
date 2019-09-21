require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`);
  })
  .catch((err) => {
    console.log(`Error connecting to Mongo: ${err}`);
  });

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'basic-auth-secret',
  cookie: { maxAge: 60000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60,
  }),
}));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true,
}));

// Make everything inside of public/ available
app.use(express.static('public'));

// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');
// tell our Express app that HBS will be in charge of rendering the HTML:
app.set('view engine', 'hbs');

// Makes a req when the user go to the route /
const landingPage = require('./routes/public/landingPage');

const authRoutes = require('./routes/public/authRoutes');

const privateRoutes = require('./routes/private/privateRoutes');

const apiRoutes = require('./routes/public/apiRoutes');

app.use('/', landingPage);
app.use('/', authRoutes);
app.use('/', apiRoutes);

app.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
});

app.use('/', privateRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} || ${process.env.ENV}`);
});

module.exports = app;
