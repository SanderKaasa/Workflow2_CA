const gulp = require('gulp');
const image = require('gulp-image');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
 

gulp.task('image', () => {
  return gulp.src('./src/images/*')
    .pipe(image())
    .pipe(gulp.dest('./dest/images'));
});


gulp.task('minify', () => {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dest'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./dest/css'));
   });
 
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("./src/*.html").on("change", reload);
});

gulp.task('default', gulp.series('image', 'minify', 'sass', 'browser-sync'));