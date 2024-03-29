"use strict";

const browsersync = require("browser-sync").create();
const concat = require('gulp-concat');
const del = require("del");
const gulp = require("gulp");
const minify = require('gulp-clean-css');
const ngAnnotate = require('gulp-ng-annotate');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const files = {
	index: './app/index.html',
	html: './app/views/*.html',
  scss: ['./app/styles/main.scss', './app/styles/app.scss'],
  js: ['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', './node_modules/angular/angular.js', './node_modules/angular-route/angular-route.js', './node_modules/angular-cookies/angular-cookies.js', './node_modules/angular-animate/angular-animate.js', './node_modules/angular-jwt/dist/angular-jwt.js', './node_modules/ng-table/dist/ng-table.js', './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js', './node_modules/angular-ui-notification/dist/angular-ui-notification.js', './node_modules/angular-translate/dist/angular-translate.js', './node_modules/angular-translate/dist/angular-translate-loader-url/angular-translate-loader-url.js', './node_modules/angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js', './node_modules/angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js', './node_modules/angular-sanitize/angular-sanitize.js', './node_modules/ngstorage/ngStorage.js', './node_modules/chart.js/dist/Chart.min.js', './node_modules/angular-chart.js/dist/angular-chart.js', './app/scripts/index.js', './app/scripts/**/*.js']
}

function clean(done){
	return del(["./dist/"]);
	done();
}

function index(done){
	return gulp.src(files.index)
  .pipe(gulp.dest('./dist/'));
  done();
}

function html(done){
	return gulp.src(files.html)
  .pipe(gulp.dest('./dist/html/'));
  done();
}

function scss(done){
	return gulp.src('./app/styles/main.scss')
  .pipe(sass({
   includePaths: ['./node_modules/bootstrap-sass/' + 'assets/stylesheets', './node_modules/animatewithsass/']
 }))
  .pipe(minify())
  .pipe(rename({
   basename: 'app',
   extname: '.min.css'
 }))
  .pipe(gulp.dest('./dist/css/'));
  done();
}

function css(done){
  return gulp.src(['./dist/css/app.min.css', './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css', './node_modules/angular-ui-notification/dist/angular-ui-notification.min.css'])
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('./dist/css/'));
  done();
}

function fonts(done){
  return gulp.src('./node_modules/bootstrap-sass/assets/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts/'));
  done();
}

function js(done){
  return gulp.src(files.js)
  .pipe(concat('app.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(rename({
   basename: 'app',
   extname: '.min.js'
 }))
  .pipe(gulp.dest('./dist/js/')
    );
  done();
}

function watch(){
	gulp.watch(files.index, gulp.series(index, browserReload));
	gulp.watch(files.html, gulp.series(html, browserReload));
  gulp.watch(files.scss, gulp.series(scss, css, browserReload));
  gulp.watch(files.js, gulp.series(js, browserReload));    
}

function browser(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

function browserReload(done) {
  browsersync.reload();
  done();
}

const run = gulp.series(clean, gulp.parallel(index, html, scss, fonts, js), css, browser, watch);

exports.run = run;
