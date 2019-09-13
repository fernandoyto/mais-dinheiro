require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/maisDinheiro', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`);
  })
  .catch((err) => {
    console.log(`Error connecting to Mongo: ${err}`);
  });

const landingPage = require('./routes/landingPage');
const authRoutes = require('./routes/authRoutes');

// Make everything inside of public/ available
app.use(express.static('public'));

// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');
// tell our Express app that HBS will be in charge of rendering the HTML:
app.set('view engine', 'hbs');

//makes a req when the user go to the route /
app.use('/', landingPage);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});

// const beers = require('./routes/beers.routes');

// app.set('view engine', 'hbs');
// app.set('views', `${__dirname}/views`);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));


// hbs.registerPartials(`${__dirname}/views/partials`);

// app.use('/', beers);

