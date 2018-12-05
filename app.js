const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
	res.render('index');
})

// 404 error handler
app.use((req, res) => {
	res.render('error', {title: '404', message: 'Page not found'})
});

// Proper error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
	res.status(500)
	res.render('error', {title: '500', message: err})
})

app.set('view engine', 'pug');

module.exports = app;