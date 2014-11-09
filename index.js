var through = require('through2');
var react = require('react-tools');
var convert = require('react-st');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');

var PluginError = gutil.PluginError;

var plugin = 'gulp-react-st',
    jsExt = /\.js$/;

module.exports = function (ops) {
    var type = ops.type || 'jsx',
        htmlDir = ops.relativeHtmlDir,
        jsDir = ops.relativeJsDir;

    function changeDir(filePath, dir) {
        return path.join(path.dirname(filePath), dir, path.basename(filePath));
    }

    function transform(file, enc, cb) {
        if (file.isNull()) return cb(null, file);
        if (file.isStream()) return cb(new PluginError(plugin, 'Streaming not supported'));

        var pathJsx = gutil.replaceExtension(file.path, '.' + type),
            js = file.contents.toString('utf8'),
            html = js,
            filePath = file.path;

        if (jsExt.test(filePath)) {
            filePath = htmlDir ? (typeof htmlDir === 'function' ? htmlDir(file) : changeDir(filePath, htmlDir)) : filePath;
            html = fs.readFileSync(gutil.replaceExtension(filePath, '.html')).toString();
        }
        else {
            filePath = jsDir ? (typeof jsDir === 'function' ? jsDir(file) : changeDir(filePath, jsDir)) : filePath;
            pathJsx = gutil.replaceExtension(filePath, '.' + type);
            js = fs.readFileSync(gutil.replaceExtension(filePath, '.js')).toString();
        }

        convert(js, html, function (err, jsx) {
            if (err) {
                return cb(new PluginError(plugin, err));
            }

            if (type === 'js') {
                try {
                    jsx = react.transform(jsx);
                }
                catch (e) {
                    return cb(new PluginError(plugin, e));
                }
            }

            file.contents = new Buffer(jsx);
            file.path = pathJsx;

            cb(null, file);
        });
    }

    return through.obj(transform);
};