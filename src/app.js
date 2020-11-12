const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

//Passport config
require("./backend/config/passport")(passport);

//Mongoose Connect
mongoose
  .connect(require("./backend/config/mongoose").mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//EJS
app.set("views", path.join(__dirname, "client/views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Static Files
app.use(express.static(path.join(__dirname, "client/")));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cookie Parser
app.use(cookieParser());

//Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1000*60*60*24*365}
  })
);

//Connect Flash
app.use(flash());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./backend/routes/htmlRoutes"));

//Listen
app.listen(8550, () => {
  console.log("Application is running in port ", 8550);
});
