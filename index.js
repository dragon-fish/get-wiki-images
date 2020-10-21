#!/usr/bin/env node

/**
 * @name get-wiki-images
 * @author Dragon-Fish
 */

const axios = require('axios').default
const { saveImage } = require('./modules/saveImage')
const { mkdirs } = require('./modules/mkdirs')
const path = require('path')

// 获取参数
const argv = process.argv.slice(2)

var wikiServer = argv[0]
var wikiPath = argv[1] || ''
var downContinue = argv[2] || ''

if (wikiPath === 'null') wikiPath = ''
if (downContinue === 'null') downContinue = ''

// 显示帮助信息
if (!wikiServer || wikiServer === '-h' || wikiServer === '--help') {
  console.log('Usage: get-wiki-images <wgServerName> [wgScriptPath]\nUpdate: yarn global add ' + require('./package.json').name)
  return
}
// 版本号
if (wikiServer === '-v' || wikiServer === '--version') {
  console.log('get-wiki-images v' + require('./package.json').version)
  return
}

// 解析 server，获取可能的 protocol 设定
var protocol = 'https'
var protocolReg = new RegExp('^(https|http)://')
if (protocolReg.test(wikiServer)) {
  wikiServer = wikiServer.replace(protocolReg, (_, match) => {
    protocol = match
    return ''
  })
}

// 创建 nodemw 实例
// 创建 ajax 实例
const AJAX = function (aifrom = '') {
  return axios.get(protocol + '://' + wikiServer + wikiPath + '/api.php', {
    params: {
      format: 'json',
      action: 'query',
      list: 'allimages',
      aifrom,
      ailimit: 'max'
    }
  })
}

// 创建存储文件夹
const fileDir = ('./images/' + wikiServer + wikiPath + '/').replace(/\/\//g, '/')
mkdirs(fileDir, () => { })

// 主函数
function main(from = '', fromCount = 0) {

  // 获取图片信息
  AJAX(from).then(({ data }) => {

    if (from) {
      console.log('* DOWNLOAD FILES FROM ' + from)
    } else {
      console.log('=== START DOWNLOAD FILES FROM ' + wikiServer + ' ===')
    }

    // 变量
    var { allimages } = data.query

    // 缓存图片数量
    var imgCount = allimages.length

    // 单次下载任务
    function downloadOne(index) {
      if (index < imgCount) {
        var img = allimages[index],
          url = img.url,
          fileName = img.name,
          filePath = fileDir + fileName
        var thisFileNo = index + fromCount + 1,
          totalFileNo = imgCount + fromCount
        var notSure = ''
        if (data.continue) notSure = '?'
        console.log(`[${(thisFileNo / totalFileNo * 100).toFixed(2)} %]`, `(${thisFileNo}/${totalFileNo}${notSure})`, fileName)

        // 下载下一张图片
        index++
        saveImage(url, filePath, () => {
          downloadOne(index)
        })
      } else {
        // 如果还有剩余图片，则继续下载
        if (data.continue) {
          main(data.continue.aicontinue, fromCount + imgCount)
        } else {
          // 下载完毕
          console.log('=== DOWNLOAD COMPLATE, CHECK FILES AT ' + path.resolve(fileDir) + ' ===')
        }
      }
    }

    // 从第一个张图片开始下载
    downloadOne(0)

  })
}

// 运行
main(downContinue)