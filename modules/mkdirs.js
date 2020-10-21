var fs = require("fs");
var path = require("path");

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
  fs.stat(dirname, function (err, exists) {
    if (exists) {
      callback();
    } else {
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
        console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
      });
    }
  });
}

module.exports = {
  mkdirs
}