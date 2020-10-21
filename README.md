# Get Wiki Images CLI

A simple command line that let you quickly back up all images on the wiki. ~~一键搬家跑路必备脚本~~

## Install
```bash
# Via yarn
yarn global add get-wiki-images
# Or via npm
npm i -g get-wiki-images

# Test installation
get-wiki-images -v
```

## Usage

```bash
get-wiki-images <wgServerName> [wgScriptPath|null] [continue|null]
```

## Examples

```bash
# Normal
get-wiki-images www.wjghj.cn

# Include protocol
get-wiki-images http://www.shoutwiki.com

# BWIKI
get-wiki-images wiki.biligame.com /ys

# Huiji Wiki
get-wiki-images ff14.huijiwiki.com /w

# Continue download from file
get-wiki-images wiki.biligame.com /ys 塞西莉亚花.png
```

## Downloaded files

Could be find at `./images/<wgServerName>/`.

e.g. You run this script at `C:\Users\YOUNAME\Documents\`. Images from `wiki.bar.com` will be save at `C:\Users\YOUNAME\Documents\images\wiki.bar.com\`