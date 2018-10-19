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
        src: 'js/script.js',
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
        .pipe($.postcss([
            require("css-mqpacker")({
                sort: sortMediaQueries
            })
            ]))
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.js.src)
        .pipe($.uglify({
            toplevel: true
        }))
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.js.build))
        .pipe(browserSync.stream());
}

 function images () {
    gulp.src(paths.images.src)
        .pipe($.tinypng('BLZpO1PPn1JhAC0IBa8ncwiTmWm93ySw'))
        .pipe(gulp.dest(paths.images.build));
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

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {

    let A = a.replace(/\D/g, '');

    let B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {

        return B - A;

    } else if (isMin(a) && isMin(b)) {

        return A - B;

    } else if (isMax(a) && isMin(b)) {

        return 1;

    } else if (isMin(a) && isMax(b)) {

        return -1;

    }

    return 1;

}