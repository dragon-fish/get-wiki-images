# Get Wiki Images CLI

A simple command line that let you quickly back up all images on the wiki. ~~一键搬家跑路必备脚本~~

## Install

```bash
# Via yarn
yarn global add get-wiki-images
# Or via npm
npm i -g get-wiki-images
```

## Usage

```bash
[user@your-computer ~]$ get-wiki-images
? Please enter the api.php URL for the wiki: https://en.wikipedia.org/w/api.php
? Dir to save images: ./en.wikipedia.org/w
? Download from?(E.g. File:塞西莉亚花.png)
[get-wiki-images] Start getting file list
[get-wiki-images]
# ...
```

<!--
## Examples

```bash
# Normal
get-wiki-images www.wjghj.cn

# Include protocol
get-wiki-images http://www.shoutwiki.com

# BWIKI
get-wiki-images wiki.biligame.com/ys

# Huiji Wiki
get-wiki-images ff14.huijiwiki.com/w

# Continue download from file name
get-wiki-images wiki.biligame.com/ys 塞西莉亚花.png
```
 -->

## Use custom dir

Files save at `./<wgServerName[wgScriptPath]>/` by default.

e.g. You run this script at `/tmp`. Images from `bar.wiki.com` will be save at `/tmp/bar.wiki.com/`

You can specify a custom folder by answering the question.
