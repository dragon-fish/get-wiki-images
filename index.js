#!/usr/bin/env node

/**
 * @name get-wiki-images
 * @author Dragon-Fish
 */

const inquirer = require('inquirer')
const validUrl = require('valid-url')
const path = require('path')
const saveFile = require('./module/saveFile')
const fs = require('fs-extra')
const getFileList = require('./module/getFileList')

!(async () => {
  // Cache options
  var options = {}

  const ask = inquirer.createPromptModule()

  var { apiUrl } = await ask([
    {
      type: 'input',
      name: 'apiUrl',
      message: 'Please enter the api.php URL for the wiki:',
      default: 'https://en.mediawiki.org/w/api.php',
      validate(answer) {
        if (!validUrl.isUri(answer)) return false
        if (!/api\.php$/.test(answer)) return false
        return true
      },
    },
  ])

  var { saveDir } = await ask([
    {
      type: 'input',
      name: 'saveDir',
      message: 'Dir to save images:',
      default() {
        var dir = apiUrl
        dir = dir.replace(/^https?:\/\//i, '')
        dir = dir.replace(/api\.php$/i, '')
        dir = './' + dir
        dir = path.resolve(dir)
        return dir
      },
      validate(answer) {
        if (answer === '') return false
        return true
      },
    },
  ])

  var { fromFile } = await ask([
    {
      type: 'input',
      name: 'fromFile',
      message: 'Download from?',
      suffix: '(E.g. File:塞西莉亚花.png)',
    },
  ])

  // Save options
  options = {
    apiUrl,
    saveDir,
    fromFile,
  }

  // Print options
  // console.log('[FinalAnswers]', options)

  // Mkdir
  await fs.mkdirs(saveDir)

  // Function
  var fileList = await getFileList(apiUrl, fromFile)
  var totalFile = fileList.length

  async function saveOne(i = 0) {
    var fileName = fileList[i]['name'],
      fileUrl = fileList[i]['url']

    // 防雷补丁
    fileName = fileName
      .replace(/\//g, '%2F')
      .replace(/:/g, '%3A')
      .replace(/\*/g, '%2A')
      .replace(/\?/g, '%3F')
      .replace(/"/g, '%22')

    await saveFile(fileUrl, path.resolve(saveDir, fileName))
    console.log(
      '[get-wiki-images]',
      `[${(((i + 1) / totalFile) * 100).toFixed(2)} %] (${i + 1}/${totalFile})`,
      fileName
    )
    i++
    if (i < totalFile) {
      return saveOne(i)
    }
  }

  console.log('[get-wiki-images]', '=== START DOWNLOAD FILES FROM ' + apiUrl + ' ===')
  await saveOne(0)
  console.log('[get-wiki-images]', '=== DOWNLOAD COMPLATE, CHECK FILES AT "' + saveDir + '" ===')
})()
