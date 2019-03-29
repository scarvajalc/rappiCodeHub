var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

/*GCLOUD configuration
if (module === require.main) {
    // [START server]
    // Start the server
    const server = app.listen(process.env.PORT || 8080, () => {
      const port = server.address().port;
      console.log(`App listening on port ${port}`);
    });
    // [END server]
  } */

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });

  module.exports = app;