const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    key: "id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  if (req.cookies.id && !req.session.user) {
    res.clearCookie("id");
  }
  next();
});

app.use(express.static(path.join(__dirname, "src/public")));

require("./src/app/routes/client")(app);
require("./src/app/routes/admin")(app);
require("./src/app/routes/rappiTendero")(app);
require("./src/app/routes/shoppingcart")(app);
require('./src/app/routes/open_branches')(app);

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

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
