var request = require('request')
var fs = require('fs')

function saveImage(url, fileName, cb) {
  request(url).pipe(
    fs.createWriteStream(fileName).on('close', function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb && cb()
      }
    })
  )
}

module.exports = {
  saveImage
}