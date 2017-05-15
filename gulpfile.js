"use strict";


var views = "./views",
    pub = "./public";

var gulp = require("gulp");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
// 引入组件
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifycss = require("gulp-minify-css");
var rename = require("gulp-rename");
var spritesmith = require("gulp.spritesmith");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var less = require("gulp-less");
var del = require("del");
var nodemon = require("gulp-nodemon");
//var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");


gulp.task("nodemon", ["livereload"], function(cb) {

    var nodemon_config = {
        script : "bin/www",
        ignore: [
            "/public/**/*.*",
            "/views/**/*.*"
        ],
        env: {  
            "NODE_ENV": "development"  
        } 
    };

    var called = false;

    return nodemon(nodemon_config);
});
//dev task end

// 检查脚本
gulp.task("lint", function() {
    gulp.src([pub + "/scripts/*.plugin.js",pub + "/scripts/*.module.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

// 合并，压缩js文件
gulp.task("scripts", function() {
    gulp.src(pub + "/scripts/*.js")
        .pipe(concat("all.js"))
        .pipe(gulp.dest(pub + "/dist/js/"))
        .pipe(rename("all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(pub + "/dist/js/"));
});


//合并、压缩路由
gulp.task("routes",function(){
    gulp.src(["./routes/header.js",
        "./routes/*.route.js",
        "./routes/*.interface.js",
        "./routes/footer.js"])
        .pipe(concat("index_pre.js"))
        .pipe(gulp.dest("./route/"))
        .pipe(rename("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./route/"));
});

//精灵图生成
gulp.task("sprite", function() {
    var spriteData = gulp.src(pub + "/images/*.png").pipe(spritesmith({
        imgName: "sprite.png",
        cssName: "sprite.css"
    }));
    return spriteData.pipe(gulp.dest(pub + "/sprite/"));
});

//图片深度压缩
gulp.task("imagemin", function() {
    gulp.src(pub + "/imgs/*.png")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest(pub + "/dist/imagemin/"));
});

gulp.task("styleCompile", function() {
    gulp.src(pub + "/less/*.less")
        .pipe(less())
        .pipe(gulp.dest(pub + "/stylesheets/")) //将会在对应目录下生成.css文件
        .pipe(concat("all.css"))
        .pipe(autoprefixer({
            browsers: ["last 3 version", "ie > 8", "Android >= 3", "Safari >= 5.1", "iOS >= 5"],
            cascade: true,
            remove:true
        }))
        .pipe(gulp.dest(pub + "/dist/css/"))
        .pipe(rename("all.min.css"))
        .pipe(minifycss())
        .pipe(gulp.dest(pub + "/dist/css/"));
});

gulp.task("livereload",function(){
    livereload.listen();

    // 监听文件变化
    return gulp.watch([views + "/*.ejs", pub + "/scripts/*.js", pub + "/less/*.less", pub + "/stylesheets/*.css",
        pub + "/images/*.png", pub + "/sprite/*.png", "./routes/*.js"
    ], function(e) {

        livereload.changed(e.path);

        var fileType = e.path.substr(e.path.lastIndexOf(".")).toLowerCase();
        var filePath = e.path.split("\\");
        var fd_type = filePath[filePath.length - 2];

        switch (fileType) {
            case ".ejs":
                gulp.run("styleCompile");
                break;

            case ".js":                    
                gulp.run("lint",fd_type);
                break;

            case ".less":
                gulp.run("styleCompile");
                break;

            case ".png":
                if (fd_type === "imgs") {
                    gulp.run("imagemin");
                };
                break;
            default:
                console.log("not an important change...");
                break;
        }
    });
});
// 默认任务
gulp.task("default", function() {
    var all_options = ["lint", "scripts", "styleCompile", "routes","nodemon"];
    gulp.run(all_options);    
});
