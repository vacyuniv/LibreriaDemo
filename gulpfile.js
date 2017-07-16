
// Modules
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');
var rimraf    = require('gulp-rimraf');
var templateCache = require('gulp-angular-templatecache');
var connect       = require('gulp-connect');
var sourcemaps    = require('gulp-sourcemaps');

// ----------------------------------------------------------------------------------------
// PAths
// ----------------------------------------------------------------------------------------
var paths = {
  libJs: {
    source: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/lovefield/dist/lovefield.js',
      './bower_components/underscore/underscore.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ],
    minified: [
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/angular/angular.min.js',
      './bower_components/angular/angular-animate.min.js',
      './bower_components/angular-route/angular-route.min.js',
      './bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './bower_components/lovefield/dist/lovefield.min.js',
      './bower_components/underscore/underscore-min.js',
      './bower_components/angular-cookies/angular-cookies.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
    ]
  },
  libCss: {
    source: [
      './bower_components/**/*.css',
      './bower_components/angular-bootstrap/*.css'
    ],
    fontAwesome : [
      './app/assets/font-awesome-4.7.0/css/*.min.css',
    ]
  },
  fonts: [
    './app/assets/font-awesome-4.7.0/fonts/*'
  ],
  appJs: [ "./app/**/*.js" ],
  appHtml: [ "./app/**/*.html", "!./app/index.html"],
  appHtmlIndex: ["./app/index.html"],
  appCss: [ "./app/assets/css/*.css"]

};


// ---------------------------------------------------------------------------------------------------------------
// Javascript Task: assemble all libs, convert coffee files into js and append all to the corresponding directives
// ---------------------------------------------------------------------------------------------------------------
gulp.task('buildJs:app', function(){
  return gulp.src(paths.appJs)
    .pipe(sourcemaps.init())
    .pipe( concat('app.js'))
    .pipe(sourcemaps.write('../maps'))
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
// Html/Template Task
// ---------------------------------------------------------------------------------------------------------------
// --- Index Task: just move --------------------------------------------------------------
gulp.task('buildHtml:index', function(){
  return gulp.src(paths.appHtmlIndex)
    .pipe( gulp.dest('./dist'));
});
// --- All others Task: just move ---------------------------------------------------------
gulp.task('buildHtml:views', function(){
  return gulp.src(paths.appHtml)
    .pipe( templateCache('templates.js', {standalone: true}))
    .pipe( gulp.dest('./dist/view'));
});
// >>> MAIN HTML TASK <<<
gulp.task("buildHtml", gulp.series('buildHtml:index', 'buildHtml:views'));

// ---------------------------------------------------------------------------------------------------------------
// Css/Fonts Task
// ---------------------------------------------------------------------------------------------------------------
gulp.task('buildCss:lib', function(){
  return gulp.src(paths.libCss.source)
    .pipe( concat('lib.css'))
    .pipe( gulp.dest('./dist/css'));
});
gulp.task('buildCss:app', function(){
  return gulp.src(paths.appCss)
    .pipe( concat('app.css'))
    .pipe( gulp.dest('./dist/css'));
});
//- --- fontAwesome is not so Awesome on configuration and docs for dependencies -----
gulp.task('buildCss:fontAwesome:css', function(){
  return gulp.src(paths.libCss.fontAwesome)
    .pipe( gulp.dest('./dist/css'));
});
gulp.task('buildCss:fontAwesome:font', function(){
  return gulp.src(paths.fonts)
    .pipe( gulp.dest('./dist/fonts'));
});
gulp.task('buildCss:fontAwesome', gulp.parallel('buildCss:fontAwesome:css', 'buildCss:fontAwesome:font'));
// >>> MAIN CSS TASK
gulp.task('buildCss', gulp.series('buildCss:lib', 'buildCss:app', 'buildCss:fontAwesome') );


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

// ---------------------------------------------------------------------------------------------------------------
// Watch Task: run again some tasks when the files change, and reload server
// ---------------------------------------------------------------------------------------------------------------
gulp.task('watch', function() {
  var cssPromise, htmlPromise, jsPromise, promiseList;
  promiseList = [];
  jsPromise = gulp.watch(paths.appJs, gulp.parallel('buildJs'));
  htmlPromise = gulp.watch(paths.appHtml, gulp.parallel('buildHtml'));
  cssPromise = gulp.watch(paths.appCss, gulp.parallel('buildCss:app'));
  promiseList.push(jsPromise);
  promiseList.push(htmlPromise);
  promiseList.push(cssPromise);
  return Promise.all(promiseList);
});

// Connect
gulp.task('connectDist', function () {
  connect.server({
    name: 'Libreria Demo',
    root: 'dist',
    port: 8000,
    livereload: true
  });
});


gulp.task('default', gulp.series('clean', gulp.parallel('buildJs', 'buildHtml', 'buildCss'), gulp.parallel('watch', 'connectDist') ) );
