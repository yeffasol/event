const gulp = require("gulp"),
    $ = require("gulp-load-plugins")({
        pattern: ["*"],
        scope: ["devDependencies"]
    }),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: 'src/styles/style.scss',
        all: 'src/styles/**/*.scss',
        build: 'build/css'
    },
    html: {
        src: '*.html'
    },
    js: {
        all: 'src/js/**/*.js',
        build: 'build/js/'
    },
    images: {
        src: 'src/images/*.+(jpg|JPG|png|svg)',
        build: 'build/images'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe($.sassGlob({
            ignorePaths: [
                "src/styles/utils/**",
                "src/styles/base/**",
            ]
        }))
        .pipe($.sass())
        .pipe($.autoprefixer({
            cascade: false
        }))
        .pipe($.cleanCss({
            level: 2
        }))
        .pipe(gulp.dest(paths.styles.build))
}

function scripts() {
    return gulp.src(paths.js.all)
        .pipe($.uglify({
            toplevel: true
        }))
        .pipe(gulp.dest(paths.js.build))
}

function watch() {
    gulp.watch(paths.styles.all, styles);
    gulp.watch(paths.js.all, scripts);
}

gulp.task("default", gulp.series(gulp.parallel(styles, scripts), watch));
gulp.task("build", gulp.parallel(styles, scripts));