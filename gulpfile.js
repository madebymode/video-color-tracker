const gulp = require('gulp');
// Scripts
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const named = require('vinyl-named');
// Styles
const sass = require('gulp-sass');
const sassImporter = { importer: require('npm-sass').importer };
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('default', ['build', 'demo']);



// ------------------------------
// Build
// ------------------------------

gulp.task('build', function() {
  return gulp.src(['./resources/assets/js/VideoColorTracker.js'])
    .pipe(named())
    .pipe(webpack(Object.assign({}, webpackConfig, {
      devtool: 'none',
      output: {
        filename: 'VideoColorTracker.js',
        libraryTarget: 'umd',
        library: 'VideoColorTracker'
      }
    })))
    .pipe(gulp.dest('./dist'));
});



// ------------------------------
// Demo
// ------------------------------

gulp.task('demo', ['demo-scripts', 'demo-styles']);

gulp.task('demo-scripts', function() {
  return gulp.src(['./resources/assets/js/demo.js'])
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./docs/js'));
});

gulp.task('demo-styles', function() {
  return gulp.src(['./resources/assets/sass/demo.scss'])
    .pipe(sass(sassImporter))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .on('error', sass.logError)
    .pipe(cleanCSS({ inline: ['none'], keepSpecialComments: 0 }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./docs/css'));
});
