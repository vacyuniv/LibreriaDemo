
// Modules
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');
var rimraf    = require('gulp-rimraf');


// ----------------------------------------------------------------------------------------
// PAths
// ----------------------------------------------------------------------------------------
var paths = {
  libJs: {
    source: [
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/lovefield/dist/lovefield.js',
      './bower_components/jquery/dist/jquery.js'
    ],
    minified: [
      './bower_components/angular/angular.min.js',
      './bower_components/angular/angular-animate.min.js',
      './bower_components/angular-route/angular-route.min.js',
      './bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './bower_components/lovefield/dist/lovefield.min.js',
      './bower_components/jquery/dist/jquery.min.js'
    ]
  },
  appJs: [ "./app/**/*.js" ],
  appHtml: [ "./app/**/*.html"],
  appCss: [ "./app/**/*.css"]

};


// ---------------------------------------------------------------------------------------------------------------
// Javascript Task: assemble all libs, convert coffee files into js and append all to the corresponding directives
// ---------------------------------------------------------------------------------------------------------------
gulp.task('buildJs:app', function(){
  return gulp.src(paths.appJs)
    .pipe( concat('app.js'))
    .pipe( gulp.dest('./dist/js'));
});
// --- Libs! As separate task because... for some reason... enhance speed... ---------------
gulp.task('buildJs:lib', function(){
  return gulp.src(paths.libJs.source)
    .pipe( concat('lib.js') )
    .pipe( gulp.dest('./dist/js'));
});
// >>> MAIN JS TASK <<< -------------------------------------------------------------------
gulp.task('buildJs', gulp.parallel('buildJs:app', 'buildJs:lib'));



// ---------------------------------------------------------------------------------------------------------------
// Clean Task: remove directory dist
// ---------------------------------------------------------------------------------------------------------------
gulp.task('clean', function() {
  var rimrafOptions = {
    read: false,
    force: true
  };
  return gulp.src( ['dist/'], { allowEmpty: true })
    .pipe( rimraf(rimrafOptions) );
});


gulp.task('default', gulp.series('clean', gulp.parallel('buildJs') ) );
