var conv = require('../index'),
    expect = require('chai').expect,
    fs = require('fs');

function file(path) {
    return fs.readFileSync(__dirname + '/' + path).toString();
}

var createFile = function (filepath, contents) {
    var base = path.dirname(filepath);
    return new gutil.File({
        path: filepath,
        base: base,
        cwd: path.dirname(base),
        contents: contents
    });
};

describe('convert function', function () {

    it ('should take source js, take relative html and convert to jsx', function (done) {
        conv({
                relativeSourceDir: './view'
            })
            .on('error', done)
            .on('data', function (file) {
                expect(file.content.toString()).to.equal(file('menu.jsx'));
                done();
            })
            .write(createFile(__dirname + '/menu.js', file('menu.js')))
        ;
    });

});