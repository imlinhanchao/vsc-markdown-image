# Markdown Image

An extension for conveniently inserting pictures in Markdown, which supports storing pictures in local or third-party CDN service.

## Features

1. Copy image files or paste screenshots.
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

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
* Icons made by [Good Ware](https://www.flaticon.com/authors/good-ware) from [www.flaticon.com](https://www.flaticon.com/)

**Enjoy!**
