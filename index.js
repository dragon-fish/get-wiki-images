#!/usr/bin/env node

/**
 * @name get-wiki-images
 * @author Dragon-Fish
 */

const bot = require('nodemw')
const { saveImage } = require('./modules/saveImage')
const { mkdirs } = require('./modules/mkdirs')

// 获取参数
const argv = process.argv.slice(2)

var server = argv[0]
const path = argv[1] || ''

// 显示帮助信息
if (!server || server === '-h' || server === '--help') {
  console.log('Usage: get-wiki-images <wgServerName> [wgScriptPath]')
  return
}
// 版本号
if (server === '-v' || server === '--version') {
  console.log('get-wiki-images v' + require('./package.json').version)
  return
}

// 解析 server，获取可能的 protocol 设定
var protocol = 'https'
var protocolReg = new RegExp('^(https|http)://')
if (protocolReg.test(server)) {
  server = server.replace(protocolReg, (_, match) => {
    protocol = match
    return ''
  })
}

// 创建 nodemw 实例
const client = new bot({
  debug: true,
  protocol,
  server,
  path,
})

// 创建存储文件夹
const fileDir = ('./images/' + server + path + '/').replace(/\/\//g, '/')
mkdirs(fileDir, () => { })

// 主函数
function main(from = '') {

  // 获取图片信息
  client.getImages(from, (err, data) => {

    console.log('=== STARTING DOWNLOADING FILES FROM ' + server + ' ===')

    // 缓存图片数量
    // var imgCount = data.length
    var imgCount = 3

    // 单次下载任务
    function downloadOne(index) {
      if (index < imgCount) {
        var img = data[index],
          url = img.url,
          fileName = img.name,
          filePath = fileDir + fileName
        console.log(`[${((index + 1) / imgCount * 100).toFixed(2)} %]`, `(${index + 1}/${imgCount})`, fileName)

        // 下载下一张图片
        index++
        saveImage(url, filePath, () => {
          downloadOne(index)
        })
      } else {
        // 下载完毕
        console.log('=== ALL DONE, CHECK FILES AT ' + fileDir + ' ===')
      }
    }

    // 从第一个张图片开始下载
    downloadOne(0)

    // 如果还有剩余图片，则继续下载
    if (data.continue) {
      main(data.continue.aicontinue)
    }

  })
}

// 运行
main()