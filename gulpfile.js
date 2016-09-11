/**
 * Created by Administrator on 2016/9/10.
 */
'use strict'
/**
 * 1.LESS编译 压缩 合并
 * 2.js合并 压缩 混淆
 * 3.img的复制
 * 4.html压缩
 * **/

var gulp =require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//LESS 编译
gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browerSync.reload(
            {stream:true}
        ));
});
// 2.js合并 压缩 混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))   //合并后的文件名
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browerSync.reload(
            {stream:true}
        ));

});
//3.img的复制
gulp.task('img',function(){
   gulp.src('src/images/*.*')
       .pipe(gulp.dest('dist/images'))
       .pipe(browerSync.reload(
           {stream:true}
       ));
});
//HTML
var htmlMin = require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
            caseSensitive:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browerSync.reload(
            {stream:true}
        ));
});
var browerSync = require('browser-sync')
gulp.task('serve',function(){
   browerSync({
       server:{
           baseDir:['dist']
       },
   },function(err,bs){
       console.log(bs.options.getIn(["urls","local"]))
   });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);

})
