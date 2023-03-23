const gulp = require('gulp');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('html', () => {
  return gulp.src('./app/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', () => {
  return gulp.src('./app/**/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify()) // Minify the JS
    .pipe(gulp.dest('dist/js/')) // Save file to dist/js/
});

gulp.task('images', async () => {
  const imagemin = await import('gulp-imagemin');
  return gulp.src('./app/img/*')
    .pipe(imagemin.default())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-favicon', () => {
  return gulp.src('./favicon.ico')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
  });
  gulp.watch('./app/**/*.html', gulp.series('html'));
  gulp.watch('./app/**/*.css', gulp.series('css'));
  gulp.watch('./app/**/*.js', gulp.series('js'));
  gulp.watch('./app/img/*', gulp.series('images')); 
});

gulp.task('build', gulp.series('clean', 'html', 'css', 'js', 'images', 'copy-favicon'));