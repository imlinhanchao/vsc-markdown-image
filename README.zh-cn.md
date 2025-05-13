[English Readme](README.md) / 简体中文说明 / [繁體中文說明](README.zh-tw.md) / [日本語説明](README.ja.md)

# Markdown Image

一个用于方便的在 Markdown 中插入图片的扩展，支持将图片存放在本地或第三方的图床或对象存储。

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [赞助开发者](http://sponsor.hancel.org)

## 功能

1. 可复制图片文件或截图粘贴，快捷键 `Alt + Shift + V`，或右键菜单 `粘贴图片`。
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
- `markdown-image.base.uploadMethods`: 并行上传的上传方法。此处设置的上传方法的上传结果，将不会被插入到 Markdown 文件中。
- `markdown-image.base.fileNameFormat`: 图片文件命名格式化字符串。支持多种变量做格式化，可同时配置文件夹格式，具体见设置。
- `markdown-image.base.codeType`: 插入代码的类型， 你可以设置为使用 `<img>` 标签， Markdown或自定义。
- `markdown-image.base.codeFormat`: 插入代码的格式代码，当 `markdown-image.base.codeType` 设置为 `DIY` 时生效。
- `markdown-image.base.imageWidth`: 图片的最大宽度，若图片大于这个宽度，则会设置宽度为该值。设置为 0 则表示不设置。
- `markdown-image.base.urlEncode`: 是否对图像的 URL 编码。

### Local 设置项目

- `markdown-image.local.path`: 图片本地存放路径，支持相对路径，相对于所粘贴的 Markdown 文件。`/` 表示打开的文件夹根目录。若路径不存在，将会自动创建。
- `markdown-image.local.referencePath`: Markdown 中的图片的引用路径格式（不包含文件名）。留空表示使用相对路径。 你可以使用 `#markdown-image.base.fileNameFormat#` 中的所有变量。例如：`/images/${YY}-${MM}/`

### GitHub Settings

- `markdown-image.github.path`: 仓库中的图片保存目录（如果不存在，则自动创建）。
- `markdown-image.github.token`: GitHub 的个人[访问令牌](https://github.com/settings/tokens)，用于访问仓库，上传图片。
- `markdown-image.github.repository`: 所要上传的目的仓库，比如：`https://github.com/username/repository/`。仓库必须要先初始化。
- `markdown-image.github.branch`: 要存放图片的仓库分支。
- `markdown-image.github.cdn`: 要使用的 CDN 地址格式，`${username}` 表示上传仓库的用户名，`${repository}` 表示上传的仓库，`${branch}` 表示上传的分支，`${filepath}` 表示上传的仓库目录与文件名。
- `markdown-image.github.httpProxy` : 设置访问Github的 HTTP 代理。

### Imgur 设置项目

- `markdown-image.imgur.clientId`: 在 `imgur` 注册的 `Client Id`。您可以在[这儿](https://api.imgur.com/oauth2/addclient)注册。
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
- `markdown-image.s3.cdn`: 设置你的 S3 CDN URL。你可以使用变量 `${bucket}` `${region}` `${pathname}` and `${filepath}`。比如：`https://${bucket}.${region}.s3.amazonaws.com/${pathname}/${filepath}`。

### SFTP 设置项目

- `markdown-image.sftp.host`: 远程服务器地址。
- `markdown-image.sftp.port`: SSH 服务端口。
- `markdown-image.sftp.username`: 远程用户名。
- `markdown-image.sftp.password`: SSH 密码。
- `markdown-image.sftp.privateKeyPath`: 远程私钥文件路径。
- `markdown-image.sftp.path`: 远程服务器的图片存储目录（如果不存在，则自动创建）。支持相对路径，相对于所粘贴的 Markdown 文件。 `/` 表示打开的文件夹根目录。注意：您不能在此处使用变量。您可以在 `#markdown-image.base.fileNameFormat#` 中使用变量。
- `markdown-image.sftp.referencePath`: Markdown 中的图片的引用路径格式（不包含文件名）。留空表示使用相对路径。 你可以使用 `#markdown-image.base.fileNameFormat#` 中的所有变量。例如：`/images/${YY}-${MM}/`

### Azure Storage 设置项目

- `markdown-image.azure.authenticationMethod`: 用于 Azure Blob 存储帐户的身份验证方法。默认值为 `Passwordless`。您可以从[这里](https://learn.microsoft.com/zh-cn/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli#authenticate-to-azure-and-authorize-access-to-blob-data)获取更多信息。
- `markdown-image.azure.accountName`: 您的 Azure Blob 存储帐户。
- `markdown-image.azure.connectionString`: 你的 Azure 存储连接字符串。
- `markdown-image.azure.container`: 你的 Azure 存储容器名称。

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

### 其他

* [GitHub](https://github.com/imlinhanchao/vsc-markdown-image)
* [VSCode Market](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)
* 图标来自 [www.flaticon.com](https://www.flaticon.com/) 的 [Good Ware](https://www.flaticon.com/authors/good-ware)

**Enjoy!**
