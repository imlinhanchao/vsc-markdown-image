[English Readme](README.md) / 简体中文说明 / [繁體中文說明](README.zh-tw.md)

# Markdown Image

一个用于方便的在 Markdown 中插入图片的扩展，支持将图片存放在本地或第三方的图床或对象存储。

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [赞助开发者](https://afdian.net/@imlinhanchao)

## 功能

1. 可复制图片文件或截图粘贴，快捷键 `Ctrl + Shift + V`，或右键菜单`粘贴图片`。
2. 自动生成 Markdown 代码插入。
3. 可配置支持 `Imgur`，`七牛`，`SM.MS`，`Coding` 等图床。默认为本地，需打开 Markdown 文件所在文件夹。
4. 也可以自定义代码实现图片上传。
5. 支援 Windows，MacOS，Linux。

## 依赖要求

Windows 和 MacOS 用户可直接使用，Linux 用户须安装 xclip.

Ubuntu
```bash
sudo apt install xclip
```

CentOS
```bash
sudo yum install epel-release.noarch
sudo yum install xclip
```

## 扩展设置项目

### 基本设置项目

- `markdown-image.base.uploadMethod`: 上传图片的方式，根据不同的方式，须在设置不同的项目。
- `markdown-image.base.fileNameFormat`: 图片文件命名格式化字符串。支持多种变量做格式化，可同时配置文件夹格式，具体见设置。

### Local 设置项目

- `markdown-image.local.path`: 图片本地存放路径，支持相对路径，相对于所粘贴的 Markdown 文件。`/` 表示打开的文件夹根目录。若路径不存在，将会自动创建。

### Coding 设置项目

- `markdown-image.coding.token`: Coding 的个人[访问令牌](https://help.coding.net/docs/member/tokens.html)，用于访问仓库，上传图片。
- `markdown-image.coding.repository`: 所要上传的目的仓库，比如：`https://coding-demo.coding.net/p/coding-demo/d/coding-demo/git`
- `markdown-image.coding.path`: 图片存放的仓库目录，默认为根目录。

### Imgur 设置项目

- `markdown-image.imgur.clientId`: 在 `imgur` 注册的`Client Id`。您可以在[这儿](https://api.imgur.com/oauth2/addclient)注册。
- `markdown-image.imgur.httpProxy`: 设置访问的 HTTP 代理。

### SM.MS 设置项目

- `markdown-image.sm_ms.token`: SM.MS Secret Token。您可以注册一个帐户，然后访问 [API Access](https://sm.ms/home/apitoken) 页面生成。

### 七牛设置项目

- `markdown-image.qiniu.accessKey`: 七牛账户的 Access Key。
- `markdown-image.qiniu.secretKey`: 七牛账户的 Secret Key。
- `markdown-image.qiniu.bucket`: 七牛的对象存储空间名。
- `markdown-image.qiniu.domain`: 七牛空间绑定的域名。
- `markdown-image.qiniu.zone`: 七牛空间的存储区域。

### 自定义设置项目

- `markdown-image.DIY.path`: 你写的代码的路径。 你的代码必须 exports 一个像 `async function (filePath:string, savePath:string, markdownPath:string):string` 的函数。   
    比如：
    ```javascript
    const path = require('path');
    module.exports = async function(filePath, savePath, markdownPath) {
        // Return a picture access link
        return path.relative(path.dirname(markdownPath), filePath);
    }
    ```


## 发布历史

### 1.0.3

- 添加赞助链接。

### 1.0.2

- 修正图片替换提示错误。

### 1.0.1

- 更新 Readme。
  
### 1.0.0

- 初版发布。

-----------------------------------------------------------------------------------------------------------

### 其他

* [GitHub](https://github.com/imlinhanchao/vsc-markdown-image)
* [VSCode Market](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)
* 图标来自 [www.flaticon.com](https://www.flaticon.com/) 的 [Good Ware](https://www.flaticon.com/authors/good-ware)

**Enjoy!**
