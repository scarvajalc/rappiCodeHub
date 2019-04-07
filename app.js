var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));

require('./src/app/routes/client')(app);
require('./src/app/routes/admin')(app);
require('./src/app/routes/rappiTendero')(app);

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