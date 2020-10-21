var fs = require("fs");
var path = require("path");

function mkdirs(dirname, callback) {
  fs.stat(dirname, function (err, exists) {
    if (exists) {
      callback();
    } else {
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
      });
    }
  });
}

module.exports = {
  mkdirs
}