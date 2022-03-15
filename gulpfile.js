const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function build() {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
}

function watch() {
  gulp.watch('src/*.ts', build);
}

exports.build = build;
exports.watch = gulp.series(build, watch);
