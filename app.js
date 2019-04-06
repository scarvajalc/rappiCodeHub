var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'src/public')));

app.get('/clientIndex', function (req, res) {
  res.render('clientIndex');
});

app.get('/clientRegister', function(req, res){
  res.render('clientRegister');
});

app.get('/clientLogin', function(req, res){
  res.render('clientLogin');
});

app.get('/adminIndex', function (req, res){
  res.render('adminIndex');
});

app.get('/adminLogin', function (req, res){
  res.render('adminLogin');
});

app.get('/rappiTenderoIndex', function (req, res){
  res.render('rappiTenderoIndex');
});

app.get('/rappiTenderoLogin', function (req, res){
  res.render('rappiTenderoLogin');
});

const Clients = require('./src/app/controllers/client');
const Admins = require('./src/app/controllers/admin');
const Rappitenderos = require('./src/app/controllers/rappitendero');

app.use('/clients', Clients);
app.use('/admins', Admins);
app.use('/rappitenderos', Rappitenderos);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;