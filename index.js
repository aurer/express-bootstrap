const app = require('./app/app');
const config = require('./config.json');

app.listen(config.port, () => {
	console.log(`App running at http://localhost:${config.port}`);
});
