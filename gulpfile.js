var config = require('./gulp.config')();
var replace = require('gulp-string-replace');
var gulp = require('gulp');
var gutil = require('gulp-util');
var critical = require('critical').stream;
var runSequence = require('run-sequence');
const debug = require('gulp-debug');

gulp.task('performance', function () {
  runSequence('insert-async', 'insert-preload');
});

gulp.task('insert-async', function () {
  gulp.src(config.index, {
      base: './dist'
    })
    .pipe(replace('></script>',
      ' async ></script>'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('insert-preload', function () {
  gulp.src(config.index, {
      base: './dist'
    })

    .pipe(replace('<link ',
      '<link preload '))
    .pipe(gulp.dest('./dist'));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {

  return gulp.src(config.index)
    .pipe(critical({
      base: 'dist/',
      inline: true
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(gulp.dest(config.dist));
});
