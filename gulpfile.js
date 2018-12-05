const server = require('browser-sync');
const gulp = require('gulp');
const scss = require('gulp-sass');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const config = require('./config.json');

const src = './assets';
const dist = './public';

// Compile scss
gulp.task('scss', function() {
	gulp.src([`${src}/scss/main.scss`])
		.pipe(plumber())
		.pipe(scss())
		.pipe(gulp.dest(`${dist}/css`))
		.pipe(server.stream());
});

// Compile javascript
gulp.task('js', function() {
	gulp.src([`${src}/js/main.js`])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest(`${dist}/js`))
		.pipe(server.stream());
});

// Setup local server with injection
gulp.task('serve', function() {
	server.init({
		proxy: 'localhost:' + config.port,
		notify: false
	});

	gulp.watch(`${src}/js/**/*.js`, ['js']);
	gulp.watch(`${src}/scss/**/*.scss`, ['scss']);
});

gulp.task('default', ['scss', 'js']);
gulp.task('dev', ['default', 'serve']);