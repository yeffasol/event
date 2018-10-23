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
        src: 'src/*.html',
        index: 'index.html',
        build: 'build'
    },
    js: {
        index: 'src/index.js',
        all: 'src/js/**/*.js',
        build: 'build/js/',
    },
    images: {
        src: 'src/images/*.+(jpg|JPG|png)',
        build: 'build/images'
    },
    svg: {
        src: 'src/images/**/*.svg',
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
        .pipe($.postcss([
            require("postcss-assets")({
                loadPaths: ["src/images/"]
            }),
            require('postcss-image-inliner')({
                assetPaths: ['https://icongr.am']
            }),
            require("css-mqpacker")({
                sort: sortMediaQueries
            })
        ]))
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.js.all)
        .pipe(gulp.dest(paths.js.build))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(paths.images.src)
        .pipe($.tinypng('BLZpO1PPn1JhAC0IBa8ncwiTmWm93ySw'))
        .pipe(gulp.dest(paths.images.build));
}

function html() {
    return gulp.src(paths.html.src)
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: 'src/templates'
        }))
        .pipe(gulp.dest(paths.html.build))
        .pipe(browserSync.stream());
}

function svg() {
    return gulp.src(paths.svg.src)
        .pipe($.svgmin())
        .pipe(gulp.dest(paths.svg.build));
}

function watch() {
    browserSync.init({
        notify: false,
        open: false,
        tunnel: true,
        server: {
            baseDir: "build"
        }
    });
    gulp.watch(paths.styles.all, styles);
    gulp.watch(paths.js.all, browserSync.reload);
    gulp.watch(paths.js.index, browserSync.reload);
    gulp.watch(paths.html.src, html);
}

gulp.task("default", gulp.series(gulp.parallel(html, styles, scripts), watch));
gulp.task("build", gulp.parallel(html, styles, scripts));

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