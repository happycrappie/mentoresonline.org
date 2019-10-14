/*****************
 * Gulp Requires
 *****************/

const { src, dest, series, parallel } = require('gulp'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      bs = require('browser-sync'),
      babel = require('gulp-babel'),
      clean = require('gulp-clean'),
      concat = require('gulp-concat'),
      plumber = require('gulp-plumber'),
      cleanCSS = require('gulp-clean-css'),
      prefix = require('gulp-autoprefixer'),
      concatCSS = require('gulp-concat-css');

const reload = bs.reload;

/*****************
 * Paths
 *****************/

  // Main Paths
  const srcRoot = './src/',
        buildRoot = './public/';

  // Source Files
  const srcPaths = {
    js: srcRoot + 'js/',
    css: srcRoot + 'sass/',
    mail: srcRoot + 'mail/',
    views: srcRoot + 'views/',
    videos: srcRoot + 'views/videos/',
    assets: srcRoot + 'assets/',
  }
  // Build Files
  const buildPaths = {
    js: buildRoot + 'js/',
    css: buildRoot + 'css/',
    img: buildRoot + 'img/',
    mail: buildRoot + 'mail/',
    videos: {
      raiox: buildRoot + 'raio-x/',
      linha: buildRoot + 'linha-do-tempo/',
      estudo: buildRoot + 'estudo-de-caso/',
      fronteiras: buildRoot + 'sem-fronteiras/',
    },
    assets: buildRoot + '_assets/',
  }

/*****************
 * Views
 *****************/
  function views(cb) {
    const views = srcRoot + 'views/',
          pages = views + 'pages/',
          videos = views + 'videos/';

    return src([
        views + '*.pug',
        pages + '**/*.pug',
        videos + '**/*.pug'
      ])
      .pipe(pug({
        pretty: true
      }))
      .pipe(plumber())
      .pipe(dest(buildRoot));
  }

/*****************
 * Styles
 *****************/
  function styles(cb) {

    // Main Styles
    src(srcPaths.css + 'main.scss')
      .pipe(plumber())
      .pipe(sass.sync({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
      }))
      .pipe(prefix({
        browsers: [
          'last 2 versions',
          'android 4',
          'opera 12',
        ]
      }))
      .pipe(dest(buildPaths.css));

    // CSS Libs
    // src(srcPaths.css + 'libs/*')
    //   .pipe(plumber())
    //   .pipe(cleanCSS())
    //   .pipe(concatCSS('assets.css'))
    //   .pipe(dest(buildPaths.css));

    cb();
  }



/*****************
 * Scripts
 *****************/
  function scripts(cb) {
    src(srcPaths.js + '*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(dest(buildPaths.js));

    cb();
  }

 /*****************
 * Clean Build
 *****************/

function cleanBuild() {
  return src(buildRoot, {
    allowEmpty: true
  }).pipe(clean());  
}


/*****************
 * Gulp Exports
 *****************/
exports.clean = cleanBuild;
exports.dev = series(cleanBuild, views, styles, scripts);
//exports.build = series();