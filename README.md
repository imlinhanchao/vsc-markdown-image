English Readme / [简体中文说明](README.zh-cn.md) / [繁體中文說明](README.zh-tw.md)

# Markdown Image

An extension for conveniently inserting pictures in Markdown, which supports storing pictures in local or third-party CDN service.

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [赞助开发者](http://sponsor.hancel.org)

## Features

1. Copy image files or paste screenshots, Shortcut key `Ctrl + Shift + V`, or right-click menu `Paste Image`.
2. Automatically generate Markdown code insertion.
3. Configurable to support `Imgur`, `Qiniu`, `SM.MS`, `Coding` and other CDN service. The default is local, you need to open the folder where the Markdown file is located.
4. You can also customize the code to upload pictures.
5. Support Windows, MacOS, Linux.

## Requirements

Linux users must install xclip.

Ubuntu
```bash
sudo apt install xclip
```

CentOS
```bash
sudo yum install epel-release.noarch
sudo yum install xclip
```

## Extension Settings

### Base Settings

- `markdown-image.base.uploadMethod`: Method to upload pictures. To the local or another picture CDN service.
- `markdown-image.base.fileNameFormat`: The filename format for upload. Not Support in `Imgur` and `SM.MS`. You can use some variables. You can find more in setting.

### Local Settings

- `markdown-image.local.path`: Picture storage directory that in the local (automatically created if it does not exist).

### Coding Settings

- `markdown-image.coding.token`: Coding person [access token](https://help.coding.net/docs/member/tokens.html).
- `markdown-image.coding.repository`: Coding repository, for example: `https://coding-demo.coding.net/p/coding-demo/d/coding-demo/git`
- `markdown-image.coding.path`: Picture upload directory that in the repository (automatically created if it does not exist).

### Imgur Settings

- `markdown-image.imgur.clientId`: The client id registered with imgur. You can registed it at [here](https://api.imgur.com/oauth2/addclient).
- `markdown-image.imgur.httpProxy`: Connect to Imgur via http proxy.

### SM.MS Settings

- `markdown-image.sm_ms.token`: SM.MS API token (Options). You can register an account and then visit [API Token](https://sm.ms/home/apitoken) Page to generate secret token.

### Qiniu Settings

- `markdown-image.qiniu.accessKey`: The Access Key of account。
- `markdown-image.qiniu.secretKey`: The Secret Key of account。
- `markdown-image.qiniu.bucket`: The storage name。
- `markdown-image.qiniu.domain`: Bound domain name of storage。
- `markdown-image.qiniu.zone`:  Zone of storage.

### DIY Settings
- `markdown-image.DIY.path`: The Code Path what you write. Your code must exports a function as `async function (filePath:string, savePath:string, markdownPath:string):string`.  
    For example: 
    ```javascript
    const path = require('path');
    module.exports = async function(filePath, savePath, markdownPath) {
        // Return a picture access link
        return path.relative(path.dirname(markdownPath), filePath);
    }
    ```

## Release Notes

### 1.0.9
- Fixed the problem of getting wrong date and hour in filename formatting.

### 1.0.8
- Add mdx support.

### 1.0.7
- Fixed launch extension home page failed at MacOS and Linux.
- Fixed the colon of the picture address is incorrectly encode.
   
### 1.0.6

- Fixed the date variable has not consider the time zone.

### 1.0.5

- Fixed file name include space could not preview.
- Fixed random variable not work.
  
### 1.0.4

- Update sponsored links.

### 1.0.3

- Add sponsored links.

### 1.0.2
- Fixed replace notice bug.

### 1.0.1
- Update Readme.

### 1.0.0

- Initial release.

-----------------------------------------------------------------------------------------------------------

### Others

* [GitHub](https://github.com/imlinhanchao/vsc-markdown-image)
* [VSCode Market](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)
* Icons made by [Good Ware](https://www.flaticon.com/authors/good-ware) from [www.flaticon.com](https://www.flaticon.com/)

**Enjoy!**
