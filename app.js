const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Make everything inside of public/ available
app.use(express.static('public'));

// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');
// tell our Express app that HBS will be in charge of rendering the HTML:
app.set('view engine', 'hbs');

//makes a req when the user go to the route /
app.get('/', (req, res, next) => {
  res.render('ladingPage');  // send views/ladingPage.hbs for displaying in the browser
});


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

