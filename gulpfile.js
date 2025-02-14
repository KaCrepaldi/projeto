const { series} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')

function tarefasCSS(callback) {
    
    gulp.src([
        './node_modules/bootstrap/css/bootstrap.css',
        './owl/css/owl.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './jquery-ui/jquery-ui.css',
        '.src/css/style.css'

    ])
        .pipe(stripCss())    // remove comentários
        .pipe(concat('styles.css'))  //mescla arquivos
        .pipe(cssmin())     //minifiva css
        .pipe(rename({ suffix: 'min'}))  // style.min.css
        .pipe(gulp.dest('./dist/css'))  // cria arquivo em novo diretório
     callback()   


}



function tarefaJS(callback){

     gulp.src([
        './node_modules/jquery/jQuery.js',
        './node_modules/bootstrap/js/bootstrap.js',
        './owl/js/owl.js',
        '.jquery-mask/jquery.mask.js',
        'jquery-ui/jquery-ui.js',
        '.src/js/custom.js',


    ])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'})) //libs.min.js
    .pipe(gulp.dest('./dist/js'))
}

function tarefasImagem(){

    return gulp.src('./src/imagens/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/imagens'))

}   

// POC - Proof of Concept
function tarefasHTML(callback){
    
    gulp.src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))

    return callback()
}


exports.styles = tarefasCSS
exports.scripts = tarefaJS
exports.images = tarefasImagem

exports.default = parallel( tarefasHTML, tarefaJS, tarefasCSS)

