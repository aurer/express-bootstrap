const app = require('./app/app');
const config = require('./config.json');

app.listen(config.port, () => {
	console.log(`App running on port ${config.port}`);
});
