const gulp = require('gulp');
const server = require('browser-sync');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const config = require('./config.json');

const src = './assets';
const dist = './public';

// Compile scss
function scss(cb) {
	gulp
		.src([`${src}/scss/main.scss`])
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(`${dist}/css`))
		.pipe(server.stream());
	cb();
}

// Compile javascript
function js(cb) {
	gulp
		.src([`${src}/js/main.js`])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest(`${dist}/js`))
		.pipe(server.stream());
	cb();
}

// Setup local server with injection
function serve(cb) {
	server.init({
		proxy: 'localhost:' + config.port,
		notify: false
	});

	gulp.watch(`${src}/js/**/*.js`, js);
	gulp.watch(`${src}/scss/**/*.scss`, scss);

	cb();
}

function compileAssets(cb) {
	gulp.parallel(scss, js);
	cb();
}

exports.default = gulp.parallel(compileAssets);
exports.start = gulp.parallel(compileAssets, serve);
