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
        dir = ops.relativeSourceDir;

    function transform(file, enc, cb) {
        if (file.isNull()) return cb(null, file);
        if (file.isStream()) return cb(new PluginError(plugin, 'Streaming not supported'));

        var pathJsx = gutil.replaceExtension(file.path, '.' + type),
            js = file.contents.toString('utf8'),
            html = js,
            filePath = file.path;

        if (dir) {
            filePath = path.join(path.dirname(filePath), dir, path.basename(filePath));
        }

        if (jsExt.test(filePath)) {
            html = fs.readFileSync(gutil.replaceExtension(filePath, '.html'));
        }
        else {
            js = fs.readFileSync(gutil.replaceExtension(filePath, '.js'));
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