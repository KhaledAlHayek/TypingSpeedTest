const gulp = require("gulp"),
      prefixer = require("gulp-autoprefixer"),
      concat = require("gulp-concat"),
      srcmaps = require("gulp-sourcemaps"),
      sass = require("gulp-sass")(require("sass")),
      minify = require("gulp-minify");

gulp.task("css", () => {
  return gulp.src("sass/index.sass")
  .pipe(srcmaps.init())
  .pipe(sass({outputStyle: "compressed"}).on("errror", sass.logError))
  .pipe(prefixer("last 2 versions"))
  .pipe(concat("main.css"))
  .pipe(gulp.dest("dist/css/"))
});

gulp.task("js", () => {
  return gulp.src("./js/main.js")
  .pipe(minify())
  .pipe(gulp.dest("dist/js/"));
})

gulp.task("watch", () => {
  gulp.watch("sass/index.sass", gulp.series("css"))
  gulp.watch("./js/main.js", gulp.series("js"));
});