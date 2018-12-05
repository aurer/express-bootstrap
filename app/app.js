const express = require('express');
const path = require('path');
const createError = require('http-errors');
const app = express();
const routes = require('./routes');

// Set app defaults
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Add routes
app.use(routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error')
});

module.exports = app;