const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Welcome to Express' });
});

router.post('/', (req, res, next) => {
	res.json(req.body);
});

module.exports = router;
