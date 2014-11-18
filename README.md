gulp-react-st
=============

Gulp plugin for https://github.com/redexp/react-separate-template

[![Build Status](https://travis-ci.org/redexp/gulp-react-st.svg?branch=master)](https://travis-ci.org/redexp/gulp-react-st)

## Installation

`npm install gulp-react-st`

## Usage

```javascript
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumb = require('gulp-plumber'),
    convert = require('./index');

gulp.task('react-st', function () {
    watch(['js/components/*.js', 'js/views/*.html'])
        .pipe(plumb())
        .pipe(convert({
            relativeHtmlDir: '../views',
            relativeJsDir: '../components',
            type: 'js'
        }))
        .pipe(gulp.dest('js/build'))
    ;
});
```

## Options

 * `relativeHtmlDir: [String|Function]` - optional relative to current file path to html directory if current file have `.js` extension.
 * `relativeJsDir: [String|Function]` - optional relative path to js directory if current file extension is different to `.js`.
 * `type: ["jsx"|"js"]` - optional type of output file. If `jsx` then output file will have `.jsx` extension, if `js` then output jsx code
    will be converted to js code with `react-tools` module and extension will be `.js`. Default is `jsx`.

Relative file name should be the same with current file, so if `menu.js` then html should be `menu.html`.
If relative paths not specified then plugin will look for relative file in same directory where current file.