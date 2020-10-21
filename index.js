const bot = require('nodemw')
const fs = require('fs')
const { saveImage } = require('./modules/saveImage')
const { mkdirs } = require('./modules/mkdirs')

const { argv } = process

const server = argv[2]
const path = argv[3] || ''

const helpText = 'Usage: yarn start <wgServerName> [wgScriptPath]'

if (!server) {
  console.error('Missing params\n' + helpText)
  return
}

if (server === '-h' || server === '--help') {
  console.log(helpText)
  return
}

const client = new bot({
  protocol: 'https',
  debug: true,
  server,
  path,
})

const fileDir = ('./images/' + server + path + '/').replace(/\/\//g, '/')

mkdirs(fileDir, () => { })

function start(from = '') {
  client.getImages(from, (err, data) => {
    var imgCount = data.length
    // var imgCount = 10

    function downloadOne(index) {
      if (index < imgCount) {
        var img = data[index],
          url = img.url,
          fileName = img.name,
          filePath = fileDir + fileName
        console.log(`[${((index + 1) / imgCount * 100).toFixed(2)} %]`, `(${index + 1}/${imgCount})`, fileName)
        index++
        saveImage(url, filePath, () => {
          downloadOne(index)
        })
      }
    }

    downloadOne(0)

    if (data.continue) {
      start(data.continue.aicontinue)
    } else {
      console.log('=== 图片下载完毕 ===')
      console.log('请在 ' + fileDir + '查看')
    }

  })
}

start()