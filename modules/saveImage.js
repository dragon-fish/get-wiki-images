var request = require('request')
var fs = require('fs')

function saveImage(url, filename, fn) {
  request(url).pipe(
    fs.createWriteStream(filename).on('close', function (err, res) {
      if (err) {
        console.log(err)
      } else {
        fn && fn()
      }
    })
  )
}

module.exports = {
  saveImage
}