const gulp = require('gulp');
const cssScss = require('gulp-css-scss');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const del = require('del');
const stripDebug = require('gulp-strip-debug'); // 仅用于本例做演示
const vinylPaths = require('vinyl-paths');

const open = require("open");

const conifg = {
    src: 'src',
    public: 'public',
    build: 'build'
};

gulp.task('default', ['clean']);

gulp.task('clean', (cb)=> {
  return  del([`${conifg.public}`,
  ], cb);
});

gulp.task('copy-html', () => {
    return gulp.src(`${conifg.src}/**/*.html`)
        .pipe(gulp.dest(`${conifg.public}`))
        .pipe(browserSync.reload({ stream:true }));
});
gulp.task('copy-vender', () => {
    return gulp.src(`${conifg.src}/vender/**/*`)
    	.pipe(changed(`${conifg.public}/vender/**/*`))
        .pipe(gulp.dest(`${conifg.public}/vender`))
        .pipe(browserSync.reload({ stream:true }));
});

/**
 * [description] sass to css
 * @param  {[type]} 'sass' [description]
 * @param  {[type]} (      [description]
 * @return {[type]}        [description]
 */
gulp.task('sass-css', () => {
    return gulp.src(`${conifg.src}/scss/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${conifg.public}/css`))
        .pipe(browserSync.reload({ stream:true }));
});

/**
 * [description]  css to sass
 * @param  {[type]} 'css-scss' [description]
 * @param  {[type]} (          [description]
 * @return {[type]}            [description]
 */
gulp.task('css-sass', () => {
    return gulp.src(`${conifg.src}/scss/*.scss`)
        .pipe(cssScss())
        .pipe(gulp.dest(`${conifg.public}/css`));
});

gulp.task('concat-js',()=>{
	return gulp.src(`${conifg.src}/js/**/*.js`)
        .pipe(concat('index.js'))
        .pipe(gulp.dest(`${conifg.public}/js/`));
});


// 监视文件改动并重新载入
gulp.task('serve', ['copy-html', 'copy-vender', 'sass-css', 'concat-js'], function() {
	browserSync.init({
		ui: false,
    	port: 10002,
        server: {
             baseDir: conifg.public
        },
        // open: false,
        notify: false,
        socket:{
        	namespace:'localhost:10002/browser-sync'
        }
    },()=>{
    	// console.log('打开 http://edit.liuchengyong.cn');
    	// open("http://edit.liuchengyong.cn");
    });
    // browserSync.io('localhost:3003/browser-sync')
   
    gulp.watch(`${conifg.src}/**/*.html`, ['copy-html']);
    gulp.watch(`${conifg.src}/vender/**/*.*`, ['copy-vender']);
    gulp.watch(`${conifg.src}/scss/**/*.scss`, ['sass-css']);
    gulp.watch(`${conifg.src}/js/**/*.js`, ['concat-js']);
    // gulp.watch(['*.html', 'js/**/*.js'], {cwd: conifg.src}, browserSync.reload);
});
