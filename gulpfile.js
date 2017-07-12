
// Modules
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');


// ----------------------------------------------------------------------------------------
// PAths
// ----------------------------------------------------------------------------------------
var paths = [
  libJs: {
    source: [
      './bower_components/jquery/dist/jquery.js'
    ],
    minified: [

    ]
  },
  appJs: [
    ""
  ]

];


// ---------------------------------------------------------------------------------------------------------------
// Javascript Task: assemble all libs, convert coffee files into js and append all to the corresponding directives
// ---------------------------------------------------------------------------------------------------------------
gulp.task('buildJs:app', function(){

});
// --- Libs! As separate task because... for some reason... enhance speed... ---------------
gulp.task('buildJs:lib', function(){
  return gulp.src(paths.libJs.source)
    .pipe( concat('lib.js') )
    .pipe( gulp.dest('./dist/js'));
});
