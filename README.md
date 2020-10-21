# Nodemw download all images

A simple script that let you quickly back up all images on the wiki via the command line.

## Usage

```bash
# Handling dependencies
yarn install
# Run
yarn start <wgServerName> [wgScriptPath]

# Examples
## Normal
yarn start www.wjghj.cn
## Include protocol
yarn start http://www.shoutwiki.com
## BWIKI
yarn start wiki.biligame.com /ys
## Huiji Wiki
yarn start ff14.huijiwiki.com /w
```

## Downloaded files

Could be find at `./images/<wgServerName>/`.