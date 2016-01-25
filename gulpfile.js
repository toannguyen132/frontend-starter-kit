var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

/** JS **/
var browserify_tasks = [];
browserify_tasks.forEach(function(task){
	gulp.task('browserify-' + task , function() {
	    return browserify('./assets/js/' + task + '.js').bundle()
	        // vinyl-source-stream makes the bundle compatible with gulp
	        .pipe(source( 'bundle-' + task + '.js')) // Desired filename
	        // Output the file
	        .pipe(gulp.dest('./public/js/'));
	});
});

gulp.task('browserify' , function() {
    return browserify('./assets/js/app.js').bundle()
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source( 'bundle.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./public/js/'));
});

/** SASS **/
gulp.task('sass', function(){
	gulp.src('./assets/scss/*.scss')
		.pipe( sass() )
		.pipe( autoprefixer( {
			browsers: ['last 2 versions'],
			cascade: false } ) )
		.pipe( gulp.dest('./public/css') );
});

/** watch **/
gulp.task('watch', function(){
	browserify_tasks.forEach(function(task){
		gulp.watch(['assets/js/'+task+'.js'], ['browserify-' + task ]);
	});
	gulp.watch(['assets/js/app.js'], ['browserify']);
	gulp.watch(['assets/scss/*', 'assets/scss/**/*'], ['sass']);
});

var defaults = browserify_tasks.map(function(task){
	return 'browserify-' + task;
});
defaults.push( 'sass' );
defaults.push( 'browserify' );
defaults.push( 'watch' );
gulp.task('default', defaults);