var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function(){
    return gulp.src('./public/stylesheets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/dist/css'))
})

gulp.task('default', function(){
    gulp.watch('./public/stylesheets/sass/*.scss', gulp.series('styles'));
})