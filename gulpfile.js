var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  babel = require("gulp-babel"),
  jshint = require("gulp-jshint"),
  concat = require("gulp-concat"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglifyjs"),
  fileinclude = require("gulp-file-include"),
  svgstore = require("gulp-svgstore"),
  inject = require("gulp-inject"),
  notify = require("gulp-notify"),
  imagemin = require("gulp-imagemin"),
  concat = require("gulp-concat");

gulp.task("fileinclude", function() {
  gulp
    .src(["src/view/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("src"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("svgstore", function() {
  var svgs = gulp
    .src("src/assets/icons/svg-icons/*.svg")
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }
  return gulp
    .src("src/assets/icons/svg-sprite/sprite.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("src/assets/icons/svg-sprite/"));
});

gulp.task("imagemin", () =>
  gulp
    .src("src/assets/img/before/**/*")
    .pipe(
      imagemin([], {
        verbose: true
      })
    )
    .pipe(gulp.dest("src/assets/img/after/"))
);

gulp.task("sass", function() {
  return gulp
    .src("src/styles/scss/*.scss")
    .pipe(sass())
    .on(
      "error",
      notify.onError({
        title: "Sass Compilation Failed",
        message: "<%= error.message %>"
      })
    )
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(gulp.dest("src/styles"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("scripts", function() {
  return gulp
    .src("./src/view/**/*.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(
      jshint({ browser: true, node: true }).pipe(jshint.reporter("default"))
    )
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/js/"));
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "src",
      index: "index.html"
    },
    notify: false
  });
});

gulp.task("watch", ["browser-sync"], function() {
  gulp.watch("src/view/**/*.html", ["fileinclude", browserSync.reload]);
  gulp.watch("src/view/*.html", ["fileinclude", browserSync.reload]);
  gulp.watch("src/view/**/*.scss", ["sass"]);
  gulp.watch("src/styles/scss/**/*.scss", ["sass"]);
  gulp.watch("src/view/**/*.html", browserSync.reload);
  gulp.watch("src/view/**/*.js", ["scripts", browserSync.reload]);
});

gulp.task("build", ["sass", "scripts"], function() {
  var buildCss = gulp.src("src/styles/main.css").pipe(gulp.dest("dist/styles"));

  var buildImg = gulp
    .src("src/assets/img/**.*")
    .pipe(gulp.dest("dist/assets/img"));

  var buildFonts = gulp
    .src("src/assets/fonts/**/*")
    .pipe(gulp.dest("dist/assets/fonts"));

  var buildJson = gulp.src("src/data/**.*").pipe(gulp.dest("dist/data"));

  var buildJs = gulp.src("src/js/**/*").pipe(gulp.dest("dist/js"));

  var buildHtml = gulp.src("src/index.html").pipe(gulp.dest("dist"));
});

gulp.task("default", ["watch"]);
