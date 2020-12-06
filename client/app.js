var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers 
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var servicesRouter = require('./routes/services');
var contactRouter = require('./routes/contact');
var projectsRouter = require('./routes/projects');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// Express 
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// EJS view Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Join to the static folders and files inside public
app.use(express.static(path.join(__dirname, "public")));

app.set("lang", "en"); //  default value

let en = new RegExp("^/en");
let ar = new RegExp("^/ar");

app.get(ar, (req, res, next) => {
	console.log("ar");
	app.set("lang", "ar");
	next();
});

app.get(en, (req, res, next) => {
	console.log("en");
	app.set("lang", "en");
	next();
});

let home = new RegExp("/(en|ar|)");
let about = new RegExp("/(en/|ar/|)about");
let services = new RegExp("/(en|ar)/services");
let projects = new RegExp("/(en|ar)/projects");
let contact = new RegExp("/(en|ar)/contact");

// Routers uses
app.use(home, indexRouter);
app.use(about, aboutRouter);
app.use(services, servicesRouter);
app.use(projects, projectsRouter);
app.use(contact, contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});
app.listen((port = 3000), () => {
	console.log(`Serve is up on http://localhost:${port}`);
});

module.exports = app;
