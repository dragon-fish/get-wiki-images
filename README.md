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
get-wiki-images <wgServerName[wgScriptPath]> [continueFileName|null] [customDir|null]
```

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

## Use custom dir

Files save at `./<wgServerName[wgScriptPath]>/` by default.

e.g. You run this script at `/tmp`. Images from `bar.wiki.com` will be save at `/tmp/bar.wiki.com/`

You can specify a custom folder:

```bash
# Save to custom dir 
[user@your-computer /tmp]$ get-wiki-images www.wjghj.cn null ./customDir/images
```

Files will save to `/tmp/customDir/images/`