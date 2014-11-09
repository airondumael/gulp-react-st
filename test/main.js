var conv = require('../index'),
    expect = require('chai').expect,
    gutil = require('gulp-util'),
    path = require('path'),
    fs = require('fs');

function getFile(path) {
    return fs.readFileSync(__dirname + '/' + path);
}

var createFile = function (filepath, contents) {
    var base = path.dirname(filepath);
    return new gutil.File({
        path: filepath,
        base: base,
        cwd: base,
        contents: contents
    });
};

describe('convert function', function () {

    it ('should take source js, take relative html and convert to jsx', function (done) {
        conv({
                relativeHtmlDir: './view'
            })
            .on('error', done)
            .on('data', function (file) {
                expect(file.contents.toString()).to.equal(getFile('menu.jsx').toString());
                expect(file.path).to.equal(__dirname + '/menu.jsx');
                done();
            })
            .write(createFile(__dirname + '/menu.js', getFile('menu.js')))
        ;
    });

    it ('should take source js, take relative html and convert to JS', function (done) {
        conv({
                relativeHtmlDir: './view',
                type: 'js'
            })
            .on('error', done)
            .on('data', function (file) {
                expect(file.contents.toString()).to.equal(getFile('menu.jsx.js').toString());
                expect(file.path).to.equal(__dirname + '/menu.js');
                done();
            })
            .write(createFile(__dirname + '/menu.js', getFile('menu.js')))
        ;
    });

    it ('should take source html, take relative js and convert to jsx', function (done) {
        conv({
                relativeJsDir: '../'
            })
            .on('error', done)
            .on('data', function (file) {
                expect(file.contents.toString()).to.equal(getFile('menu.jsx').toString());
                expect(file.path).to.equal(__dirname + '/menu.jsx');
                done();
            })
            .write(createFile(__dirname + '/view/menu.html', getFile('view/menu.html')))
        ;
    });

});