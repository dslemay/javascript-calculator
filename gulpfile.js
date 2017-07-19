var gulp = require('gulp');
var changed = require('gulp-changed');
var projectFolder = '../../../portfolio_site/projects/javascript-calculator';

gulp.task('copy', function() {
  return gulp.src('./build/**/*')
             .pipe(changed(projectFolder))
             .pipe(gulp.dest(projectFolder))
});
