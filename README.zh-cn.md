[English Readme](README.md) / 简体中文说明 / [繁體中文說明](README.zh-tw.md)

# Markdown Image

一个用于方便的在 Markdown 中插入图片的扩展，支持将图片存放在本地或第三方的图床或对象存储。

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [赞助开发者](http://sponsor.hancel.org)

## 功能

1. 可复制图片文件或截图粘贴，快捷键 `Alt + Shift + V`，或右键菜单`粘贴图片`。
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
## 注意事项

如果你要在 Remote 模式中使用，请设置 `remote.extensionKind` 如下：
```json
"remote.extensionKind": {
  "hancel.markdown-image": [
    "ui"
  ]
}
``` 

而且，如果要将图片保存在远程工作目录中，则必须使用 `SFTP` 上传方法，`Local` 方法无法在 Remote 模式中使用。

## 扩展设置项目

### 基本设置项目

- `markdown-image.base.uploadMethod`: 上传图片的方式，根据不同的方式，须在设置不同的项目。
- `markdown-image.base.fileNameFormat`: 图片文件命名格式化字符串。支持多种变量做格式化，可同时配置文件夹格式，具体见设置。
- `markdown-image.base.codeType`: 插入代码的类型， 你可以设置为使用 `<img>` 标签或 Markdown。
- `markdown-image.base.imageWidth`: 图片的最大宽度，若图片大于这个宽度，则会设置宽度为该值。设置为 0 则表示不设置。
- `markdown-image.base.urlEncode`: 是否对图像的 URL 编码。

### Local 设置项目

- `markdown-image.local.path`: 图片本地存放路径，支持相对路径，相对于所粘贴的 Markdown 文件。`/` 表示打开的文件夹根目录。若路径不存在，将会自动创建。
- `markdown-image.local.referencePath`: Markdown 中的图片的引用路径格式（不包含文件名）。留空表示使用相对路径。 你可以使用 `#markdown-image.base.fileNameFormat#` 中的所有变量。例如：`/images/${YY}-${MM}/`

### Coding 设置项目

- `markdown-image.coding.token`: Coding 的个人[访问令牌](https://help.coding.net/docs/member/tokens.html)，用于访问仓库，上传图片。
- `markdown-image.coding.repository`: 所要上传的目的仓库，比如：`https://coding-demo.coding.net/p/coding-demo/d/coding-demo/git`
- `markdown-image.coding.path`: 图片存放的仓库目录，默认为根目录。

### GitHub Settings

- `markdown-image.github.path`: 仓库中的图片保存目录（如果不存在，则自动创建）。
- `markdown-image.github.token`: GitHub 的个人[访问令牌](https://github.com/settings/tokens)，用于访问仓库，上传图片。
- `markdown-image.github.repository`: 所要上传的目的仓库，比如：`https://github.com/username/repository/`。仓库必须要先初始化。
- `markdown-image.github.branch`: 要存放图片的仓库分支。
- `markdown-image.github.cdn`: 要使用的 CDN 地址格式，`${username}` 表示上传仓库的用户名，`${repository}` 表示上传的仓库，`${branch}` 表示上传的分支，`${filepath}` 表示上传的仓库目录与文件名。

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

### 又拍云设置项目

- `markdown-image.upyun.bucket`: 又拍云的云存储服务名称。
- `markdown-image.upyun.domain`: 又拍云云存储服务绑定的域名。
- `markdown-image.upyun.operator`: 又拍云的操作员名。
- `markdown-image.upyun.password`: 又拍云的操作员密码。
- `markdown-image.upyun.path`:  又拍云图片存储路径。
- `markdown-image.upyun.link`:  又拍云链接线路。

### Cloudinary 设置项目
这些值可以在 Cloudinary Dashboard 上找到
- `markdown-image.cloudinary.cloudName`: 你的帐户名称。
- `markdown-image.cloudinary.apiKey`: 你的帐户 API key。
- `markdown-image.cloudinary.apiSecret`: 你的用户帐户 API secret。
- `markdown-image.cloudinary.folder`: 图像上传文件夹。

### Cloudflare 设置项目
这些值可以在 CloudFlare Dashboard 上找到
- `markdown-image.cloudflare.accountId`: 你的帐户名称
- `markdown-image.cloudflare.apiToken`: Cloudflare API 令牌。

### S3 设置项目

这些值可以在 S3 服务 Dashboard 上找到

- `markdown-image.s3.endpoint`: 你的 S3 API 端点，是从存储桶设置或 dashboard 获得的。
- `markdown-image.s3.region`: 你的 S3 存储桶区域，是从存储桶设置中获得的。
- `markdown-image.s3.bucketName`: 你的 S3 存储桶名称。存储桶访问权限应该是公开的。
- `markdown-image.s3.accessKeyId`: 你的 S3 access key ID。
- `markdown-image.s3.secretAccessKey`: 你的 S3 secret access key。

### SFTP 设置项目

- `markdown-image.sftp.host`: 远程服务器地址。
- `markdown-image.sftp.port`: SSH 服务端口。
- `markdown-image.sftp.username`: 远程用户名。
- `markdown-image.sftp.password`: SSH 密码。
- `markdown-image.sftp.privateKeyPath`: 远程私钥文件路径。
- `markdown-image.sftp.path`: 远程服务器的图片存储目录（如果不存在，则自动创建）。支持相对路径，相对于所粘贴的 Markdown 文件。 `/` 表示打开的文件夹根目录。注意：您不能在此处使用变量。您可以在 `#markdown-image.base.fileNameFormat#` 中使用变量。
- `markdown-image.sftp.referencePath`: Markdown 中的图片的引用路径格式（不包含文件名）。留空表示使用相对路径。 你可以使用 `#markdown-image.base.fileNameFormat#` 中的所有变量。例如：`/images/${YY}-${MM}/`


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

### 1.1.28

- 支持设置项目分组
- 添加对远程模式的支持。
- 添加 SFTP 上传方法。
- 包括以下新设置：
  - `markdown-image.sftp.host`
  - `markdown-image.sftp.port`
  - `markdown-image.sftp.username`
  - `markdown-image.sftp.password`
  - `markdown-image.sftp.privateKeyPath`
  - `markdown-image.sftp.path`
  - `markdown-image.sftp.referencePath`

### 1.1.27

- 添加了对 S3 的支持。
- 新增了包括以下新的设置：
  - `markdown-image.s3.endpoint`
  - `markdown-image.s3.region`
  - `markdown-image.s3.bucketName`
  - `markdown-image.s3.accessKeyId`
  - `markdown-image.s3.secretAccessKey`

### 1.1.26
- 添加了对 又拍云 支持.
- 新增了包括以下新的设置：
  * `markdown-image.upyun.bucket`
  * `markdown-image.upyun.domain`
  * `markdown-image.upyun.operator`
  * `markdown-image.upyun.password`
  * `markdown-image.upyun.path`
  * `markdown-image.upyun.link`

### 1.1.25
- 修正当开启 `markdown-image.base.urlEncode` 时，GitHub CDN 地址编码错误的问题。

### 1.1.24
- 修正一些 `markdown-image.local.referencePath` 的使用 bug；
- 修正图片 `alt` 计数在重载控件重新开始的问题。

### 1.1.23
- 添加了新设置项目 `markdown-image.github.cdn` 去设置 GitHub CDN 地址.

### 1.1.22
- 修复 GitHub 模式上传文件路径错误问题。

### 1.1.21
- 修复了当文件路径包含中文时，上传到 GitHub 失败的问题。

### 1.1.20
- 修复 Local 模式设置 `local.reference Path` 以 `/` 开始的值导致路径从磁盘根目录开始的问题。

### 1.1.19
- 修复 Local 模式设置保存到项目根目录，实际保存到磁盘根目录问题。

### 1.1.18
- 修复 Local 模式不能使用绝对路径的问题。

### 1.1.17
- 添加了对 Cloudflare CDN 支持.
- 新增了包括以下新的设置：
  * `markdown-image.cloudflare.accountId`
  * `markdown-image.cloudflare.apiToken`

### 1.1.16
- 添加支持上传图像到 Github 仓库。

### 1.1.15
- 添加文件格式化变量 `prompt`。可以在粘贴图像时通过输入框输入自定义名称。

### 1.1.14
- 更新 Coding-Picbed 修复上传到 Coding 错误。

### 1.1.13
- 添加了设置项目 `markdown-image.local.referencePath` 用于支持修改在 Markdown 文件中的图片引用路径。

### 1.1.12
- 添加支持在 jupyter 文件中的粘贴图像。

### [1.1.11]
- 更新了Cloudinary CDN 以使用 `markdown-image.base.fileNameFormat` 设置保存文件路徑。文件路径若已存在，将提示是否覆盖。

### 1.1.10
- 添加了对 Cloudinary CDN 的支持
- 新增了包括以下新的设置：
  * `markdown-image.cloudinary.cloudName`
  * `markdown-image.cloudinary.apiKey`
  * `markdown-image.cloudinary.apiSecret`
  * `markdown-image.cloudinary.folder`

### 1.1.9
- 添加设置选项 `markdown-image.base.codeType` 和 `markdown-image.base.imageWidth` 用于设置图片最大宽度。

### 1.1.8
- 修正 VSCode 会缓存 `DIY` 路径代码，导致修改无法即时生效的问题。

### 1.1.7
- 新增一个选项用于切换是否对 URL 编码。

### 1.1.6
- 修正扩展 Log 等级，避免干扰其他扩展开发者。
- 更新替换文件后动作。

### 1.1.5
- 修正 `Data URL` 设定项目说明。

### 1.1.4
- 新增插入 Markdown 图片方式： `Data URL`.
- 修正粘贴多个文件无效问题。

### 1.1.3
- 修复了文件名变量`${path}`导致在 Windows 系统下存在两级以上 Markdown 路径时，`Coding` 图床上传失败问题。

### 1.1.2
- 再一次修复了粘贴复制的图片时，路径包含中文提示无法找到问题。😂

### 1.1.1
- 修复了粘贴复制的图片时，路径包含中文提示无法找到问题。

### 1.1.0
- 添加了 Beta 功能，支持粘贴富文本格式。 （仅支持Windows）

### 1.0.14
- 修复了与 Windows 7 不兼容的问题。

### 1.0.13
- 修复了在 Windows 中获取剪贴板图片的路径分辨率错误的问题。

### 1.0.12
- 添加了文件名变量 `${path}`： 正在编辑的 Markdown 文件相对于根目录的路径。

### 1.0.11
- 修正 `sm.ms` API 地址。
- 修复了在 Linux 中找不到带空格的文件名的问题。
- 添加了 `sm.ms` 没有设置 token 的提示。

### 1.0.10
- 修复变量 `$mdname` 没有去除非 `md` 后缀名的问题。

### 1.0.9
- 修复了文件名格式化日期小时获取错误的问题。

### 1.0.8
- 加入支持 mdx 文件。
- 
### 1.0.7
- 修复了无法自动在 MacOS 和 Linux 上启动扩展名主页的问题。
- 修复了图片地址冒号被错误转义的问题。

### 1.0.6

- 修正日期变量没有考虑时区的问题。

### 1.0.5

- 修正包含空格的文件名无法预览的问题。
- 修正 ${rand} 变量不可用的问题。

### 1.0.4

- 更新赞助链接。

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
