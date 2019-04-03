var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  res.send('Rappi tiembla con esta nueva aplicación');
});

const Clients = require('./src/app/routes/client');
const Admins = require('./src/app/routes/admin');
const Rappitenderos = require('./src/app/routes/rappitendero');
app.use('/clients', Clients);
app.use('/admins', Admins);
app.use('/rappitenderos', Rappitenderos);

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