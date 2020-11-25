const fs = require('fs-extra')
const download = require('download')

async function saveFile(url, fileName) {
  // return download(url, fileDir)
  return fs.writeFile(fileName, await download(url))
}

module.exports = saveFile
