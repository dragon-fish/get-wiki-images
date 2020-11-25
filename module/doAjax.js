const axios = require('axios').default

module.exports = function (url, aifrom = '') {
  return axios.get(url, {
    params: {
      format: 'json',
      action: 'query',
      list: 'allimages',
      aifrom,
      ailimit: 'max',
    },
  })
}
