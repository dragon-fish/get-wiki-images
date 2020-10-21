# Get Wiki Images CLI

A simple command line that let you quickly back up all images on the wiki.

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
get-wiki-images start <wgServerName> [wgScriptPath]
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
```

## Downloaded files

Could be find at `./images/<wgServerName>/`.

e.g. You run this script at `C:\User\YOUNAME\Documents\`. Images from `wiki.bar.com` will be save at `C:\User\YOUNAME\Documents\images\wiki.bar.com\`