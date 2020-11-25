const doAjax = require('./doAjax')

module.exports = async (url, fromFile) => {
  console.log('[get-wiki-images]', 'Start getting file list')
  var list = []

  async function loop(from = '') {
    if (from) console.log('[get-wiki-images]', 'Continue get file from', from)
    var { data } = await doAjax(url, from)
    // 变量
    var { allimages } = data.query
    // 缓存图片数量
    var imgCount = allimages.length
    list.push(allimages)

    if (data.continue) {
      return loop(data.continue.aicontinue)
    }
  }

  await loop(fromFile ? fromFile : '')

  list = list.flat(Infinity)

  console.log('[get-wiki-images]', 'Finished got file list, total file: ' + list.length)

  return list
}
