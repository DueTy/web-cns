'use strict';


var views = "./views",
    pub = "./public";

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var less = require('gulp-less');
var del = require('del');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3001',
        files: ['public/**/*.*', 'views/**/*.*'],
        notify: false,
        port: 5000
    });

});


gulp.task('nodemon', function(cb) {
    del(['./public/*.ejs']);

    var called = false;

    return nodemon({
        script: 'bin/www'
    }).on('start', function() {
        if (!called) {
            cb();
            called = true;
        }
    });
});
//dev task end

// 检查脚本
gulp.task('lint', function() {
    gulp.src(pub + '/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并，压缩js文件
gulp.task('scripts', function() {
    gulp.src(pub + '/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest(pub + '/dist/js/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(pub + '/dist/js/'));
});

//精灵图生成
gulp.task('sprite', function() {
    var spriteData = gulp.src(pub + '/images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest(pub + '/sprite/'));
});

//图片深度压缩
gulp.task('imagemin', function() {
    gulp.src(pub + '/sprite/sprite.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest(pub + '/dist/css/'));
});

gulp.task('less', function() {
    gulp.src(pub + '/less/*.less')
        .pipe(less())
        .pipe(gulp.dest(pub + '/stylesheets/')); //将会在对应目录下生成.css文件
});

//合并，压缩css文件
gulp.task('minifycss', function() {
    gulp.src([pub + '/sprite/sprite.css', pub + '/stylesheets/*.css'])
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ["last 3 version", "ie > 8", "Android >= 3", "Safari >= 5.1", "iOS >= 5"],
            cascade: true,
            remove:true
        }))
        .pipe(gulp.dest(pub + '/dist/css/'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(pub + '/dist/css/'));
});
// 默认任务
gulp.task('default', function() {
    var allOptions = ['lint', 'scripts', 'minifycss', 'less', 'sprite','browser-sync'];
    gulp.run(allOptions);


    // 监听文件变化
    gulp.watch([views + '/*.html', pub + '/scripts/*.js', pub + '/less/*.less', pub + '/stylesheets/*.css',
        pub + '/images/*.png', pub + '/sprite/*.png'
    ], function(e) {
        var fileType = e.path.substr(e.path.lastIndexOf(".")).toLowerCase();
        var filePath = e.path.split("\\");

        switch (fileType) {
            case ".html":
                gulp.run('minifycss');
                break;

            case ".js":
                gulp.run('lint', 'scripts');
                break;

            case ".less":
                gulp.run('less');
                break;

            case ".css":
                gulp.run('minifycss');
                break;

            case ".png":
                if (filePath[filePath.length - 2] === 'images') {
                    gulp.run('sprite');
                };
                if (filePath[filePath.length - 2] === 'sprite') {
                    gulp.run('imagemin');
                };
                break;
            default:
                console.log("not an important change...");
                break;
        }
    });
});
