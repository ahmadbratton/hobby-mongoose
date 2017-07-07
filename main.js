const express = require("express");
const mex = require("mustache-express");
const bodyparser = require("body-parser");
const app = express();
const expressValidator = require("express-validator");
const path = require("path");
const routes = require('./routes/routes');
const session = require("express-session");

app.engine("mustache", mex());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout","layout");
app.set("port", (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(expressValidator());

app.use(session({
  secret:"nskl",
  resave: false,
  saveUninitialized:false
}));




app.use(routes);

app.listen(app.get("port"), function () {
  console.log("whats up mane");
});
