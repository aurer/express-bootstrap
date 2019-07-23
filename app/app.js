const express = require('express');
const path = require('path');
const createError = require('http-errors');
const app = express();
const routes = require('./routes/index');

// Set app defaults
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Parse request body
app.use(express.urlencoded({ extended: true }));

// Add routes
app.use(routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
	err.status = err.status || 500;
	if (req.path.match(/favicon\.ico/)) {
		return;
	}
	console.error(req.path, err.stack);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status);
	res.render('error-' + err.status, (err, html) => {
		if (err) return res.render('error');
		res.send(html);
	});
});

module.exports = app;
