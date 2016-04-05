var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	node;

//lint task
gulp.task('lint',function(){
	return gulp.src('*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('watch',function(){
	gulp.watch('./*.js',['serve']);
});

gulp.task('serve',function(){
	if (node) node.kill();
	var spawn = require('child_process').spawn;
    node= spawn('nodemon', ['app.js']);

    node.on('close',function(code){
    	if(code === 8){
    		gulp.log('Error detected, waiting for changes ...');
    	}
    });
});

gulp.task('default',['lint','serve','watch']);