const path = require("path");

const gulp = require("gulp");
const replace = require("gulp-replace");
const webpack = require("webpack");
const ws = require("webpack-stream");
const file = require("gulp-file");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

const task_html = done => {
    build_html();
    done();
}
const task_images = done => {
    build_images();
    done();
}
const task_gen_package_json = done => {
    gen_package_json();
    done();
}
const task_ui_script = done => {
    build_scripts(PATH_SRC_UI);
    done();
}
const task_ui = gulp.series(task_gen_package_json, task_ui_script);
const task_styles = done => {
    build_styles();
    done();
}
const task_worker = done => {
    build_scripts(PATH_SRC_WORKER);
    done();
}
const task_copy_release_note = done => {
    copy_release_note();
    done();
}

exports.default = gulp.parallel(
    task_html,
    task_images,
    task_ui,
    task_styles,
    task_worker,
    task_copy_release_note);

function build_html() {
    return gulp
        .src(PATH_SRC_HTML + "index.html")
        .pipe(gulp.dest(PATH_OUT));
}

function build_images() {
    return gulp
        .src(PATH_SRC_IMG + "*")
        .pipe(gulp.dest(PATH_OUT));
}

function build_scripts(src) {
    let cfg = require(src + "webpack.config.js")();
    const entry = cfg.entry;
    delete cfg.entry;
    cfg.mode = "production";

    return gulp
        .src(path.resolve(src, entry.substr(2)))
        .pipe(ws(cfg, webpack))
        .pipe(gulp.dest(PATH_OUT));
}

function build_styles() {
    const options = {
        outputStyle: "compressed"
    };

    return gulp
        .src(PATH_SRC_STYLES + "*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(options))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(PATH_OUT));
}

function gen_package_json() {
    const pkg = require("./package.json");
    const json = {
        title: pkg["title"],
        version: pkg["version"],
        author: pkg["author"],
        homepage: pkg["homepage"],
        bugs_url: pkg["bugs"]["url"],
        release_notes: pkg["release-notes"]["url"],
        build_time: LAST_BUILD_TIME
    }
    return file("package.g.json", JSON.stringify(json), {
            src: true
        })
        .pipe(gulp.dest(PATH_SRC_UI));
}

function copy_release_note() {
    return gulp
        .src("./RELEASES.md")
        .pipe(gulp.dest(PATH_OUT));
}

const PATH_SRC = "./src/";
const PATH_SRC_HTML = PATH_SRC + "ui/html/";
const PATH_SRC_IMG = PATH_SRC + "ui/images/";
const PATH_SRC_UI = PATH_SRC + "ui/scripts/";
const PATH_SRC_WORKER = PATH_SRC + "worker/";
const PATH_SRC_STYLES = PATH_SRC + "ui/styles/";

const PATH_OUT = "./out/dist/";

const LAST_BUILD_TIME = new Date().toUTCString();