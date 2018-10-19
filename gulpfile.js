const gulp = require("gulp"),
    $ = require("gulp-load-plugins")({
        pattern: ["*"],
        scope: ["devDependencies"]
    }),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: 'styles/style.scss',
        all: 'styles/**/*.scss',
        build: 'css'
    },
    html: {
        src: '*.html'
    },
    js: {
        all: 'js/**/*.js',
        build: 'js/'
    },
    images: {
        src: 'images/*.+(jpg|JPG|png|svg)',
        build: 'images'
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
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.js.all)
        .pipe($.uglify({
            toplevel: true
        }))
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.js.build))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.all, styles);
    gulp.watch(paths.js.all, scripts);
    gulp.watch(paths.html.src, browserSync.reload);
}

gulp.task("default", gulp.series(gulp.parallel(styles, scripts), watch));
gulp.task("build", gulp.parallel(styles, scripts));