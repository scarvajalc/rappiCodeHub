var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Rappi tiembla con esta nueva aplicación');
});

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