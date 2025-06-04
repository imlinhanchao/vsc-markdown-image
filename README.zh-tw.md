[English Readme](README.md) / [简体中文说明](README.zh-cn.md) / 繁體中文說明 / [日本語説明](README.ja.md)

# Markdown Image

一個用於方便的在 Markdown 中插入圖片的擴展，支持將圖片存放在本地或第三方的圖床或對象存儲。

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [贊助開發者](http://sponsor.hancel.org)

## 功能

1. 可複製圖片文件或截圖粘貼，快捷键 `Alt + Shift + V`，或右键菜单 `粘贴图片`。
2. 自動生成 Markdown 代碼插入。
3. 可配置支持 `Imgur`，`七牛`，`SM.MS`，`Coding` 等圖床。默認為本地，需打開 Markdown 文件所在文件夾。
4. 也可以自定義代碼實現圖片上傳。
5. 支援 Windows，MacOS，Linux。

## 依赖要求

Windows 和 MacOS 用戶可直接使用，Linux 用戶須安裝 xclip.

Ubuntu

```bash
sudo apt install xclip
```

CentOS

```bash
sudo yum install epel-release.noarch
sudo yum install xclip
```

## 注意事項

如果你要在 Remote 模式中使用，請設置 `remote.extensionKind` 如下：

```json
"remote.extensionKind": {
  "hancel.markdown-image": [
    "ui"
  ]
}
```

而且，如果要將圖像保存在遠程工作目录中，則必須使用 `SFTP` 上傳方法，`Local` 方法無法在 Remote 模式中使用。

## 擴展設置項目

### 基本設置項目

- `markdown-image.base.uploadMethod`: 上傳圖片的方式，根據不同的方式，須在設置不同的項目。
- `markdown-image.base.uploadMethods`: 平行上傳的上傳方法。 此處設置的上傳方法的上傳結果，將不會被插入到 Markdown 文件中。
- `markdown-image.base.fileNameFormat`: 圖片文件命名格式化字符串。支持多種變量做格式化，可同時配置文件夾格式，具體見設置。
- `markdown-image.base.codeType`: 插入代碼的類型， 你可以設置為使用 `<img>` 標籤或 Markdown。
- `markdown-image.base.codeFormat`: 插入代碼的格式代碼，當 `markdown-image.base.codeType` 設置為 `DIY` 時生效。
- `markdown-image.base.imageWidth`: 圖片的最大寬度，若圖片大於這個寬度，則會設置寬度為該值。設置為 0 則表示不設置。
- `markdown-image.base.urlEncode`: 是否對圖像的 URL 編碼。

### Local 设置项目

- `markdown-image.local.path`: 圖片本地存放路徑，支持相對路徑，相對於所粘貼的 Markdown 文件。 `/` 表示打開的文件夾根目錄。若路徑不存在，將會自動創建。
- `markdown-image.local.referencePath`: Markdown 中的圖片的引用路徑格式（不包含文件名）。留空表示使用相對路徑。你可以使用 `#markdown-image.base.fileNameFormat#` 中的所有變量。例如：`/images/${YY}-${MM}/`

### GitHub Settings

- `markdown-image.github.path`: 倉庫中的圖片保存目錄（如果不存在，則自動創建）。
- `markdown-image.github.token`: Git Hub 的個人[訪問令牌](https://github. com/settings/tokens)，用於訪問倉庫，上傳圖片。
- `markdown-image.github.repository`: 所要上傳的目的倉庫，比如：`https://github.com/username/repository/`。倉庫必須要先初始化。
- `markdown-image.github.branch`: 要存放圖片的倉庫分支。
- `markdown-image.github.cdn`: 要使用的 CDN 地址格式，`${username}` 表示上傳倉庫的用戶名，`${repository}` 表示上傳的倉庫，`${branch}` 表示上傳的分支，`${filepath}` 表示上傳的倉庫目錄與文件名。
- `markdown-image.github.httpProxy` : 設置訪問Github的 HTTP 代理。

### Imgur 設置項目

- `markdown-image.imgur.clientId`: 在 `imgur` 註冊的 `Client Id`。您可以在[這裡](https://api.imgur.com/oauth2/addclient)註冊。
- `markdown-image.imgur.httpProxy`: 設置訪問的 HTTP 代理。

### SM.MS 設置項目

- `markdown-image.sm_ms.token`: SM.MS Secret Token。您可以註冊一個帳戶，然後訪問 [API Access](https://sm.ms/home/apitoken) 頁面生成。

### 七牛設置項目

- `markdown-image.qiniu.accessKey`: 七牛賬戶的 Access Key。
- `markdown-image.qiniu.secretKey`: 七牛賬戶的 Secret Key。
- `markdown-image.qiniu.bucket`: 七牛的對象存儲空間名。
- `markdown-image.qiniu.domain`: 七牛空间绑定的域名。
- `markdown-image.qiniu.zone`: 七牛空間的存儲區域。

### 又拍云设置项目

- `markdown-image.upyun.bucket`: 又拍雲的雲存儲服務名稱。
- `markdown-image.upyun.domain`: 又拍雲雲存儲服務綁定的域名。
- `markdown-image.upyun.operator`: 又拍雲的操作員名。
- `markdown-image.upyun.password`: 又拍雲的操作員密碼。
- `markdown-image.upyun.path`:  又拍雲圖片存儲路徑。
- `markdown-image.upyun.link`:  又拍雲鏈接線路。

### Cloudinary 設置項目

這些值可以在 Cloudinary Dashboard 上找到

- `markdown-image.cloudinary.cloudName`: 你的帳戶名稱。
- `markdown-image.cloudinary.apiKey`: 你的帳戶 API key。
- `markdown-image.cloudinary.apiSecret`: 你的帳戶 API secret。
- `markdown-image.cloudinary.folder`: 圖像上傳文件夾。

### Cloudflare 設置項目

這些值可以在 CloudFlare Dashboard 上找到

- `markdown-image.cloudflare.accountId`: 你的帳戶名稱。
- `markdown-image.cloudflare.apiToken`: Cloudflare API 令牌.

### S3 設置項目

這些值可以在 S3 服務 Dashboard 上找到

- `markdown-image.s3.endpoint`: 你的 S3 API 端點，是從存儲桶設置或 dashboard 獲得的。
- `markdown-image.s3.region`: 你的 S3 存儲桶區域，是從存儲桶設置中獲得的。
- `markdown-image.s3.bucketName`: 你的 S3 存儲桶名稱。存儲桶訪問權限應該是公開的。
- `markdown-image.s3.accessKeyId`: 你的 S3 access key ID。
- `markdown-image.s3.secretAccessKey`: 你的 S3 secret access key。
- `markdown-image.s3.cdn`: 設定你的 S3 CDN URL。你可以使用變數 `${bucket}` `${region}` `${pathname}` and `${filepath}`。比如：`https://${bucket}.${region}.s3.amazonaws.com/${pathname}/${filepath}`。

### SFTP 設置項目

- `markdown-image.sftp.host`: 遠端伺服器地址。
- `markdown-image.sftp.port`: SSH 服務端口。
- `markdown-image.sftp.username`: 遠端賬戶。
- `markdown-image.sftp.password`: SSH 密碼。
- `markdown-image.sftp.privateKeyPath`: 遠端私鑰文件路徑。
- `markdown-image.sftp.path`: 遠端伺服器的圖片存儲目錄（如果不存在，則自動創建）。支持相對路徑，相對於所粘貼的 Markdown 文件。 `/` 表示打開的文件夾根目錄。注意：您不能在此處使用變量。您可以在 `#markdown-image.base.fileNameFormat#` 中使用變量。
- `markdown-image.sftp.referencePath`: Markdown 中的圖片的引用路徑格式（不包含文件名）。留空表示使用相對路徑。你可以使用 `#markdown-image.base.fileNameFormat#` 中的所有變量。例如：`/images/${YY}-${MM}/`

### Azure Storage 設置項目

- `markdown-image.azure.authenticationMethod`: 用於 Azure Blob 存儲帳戶的身份驗證方法。 默認值為 `Passwordless`。 您可以從[這裡](https://learn.microsoft.com/zh-tw/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli#authenticate-to-azure-and-authorize-access-to-blob-data)獲取更多信息。
- `markdown-image.azure.accountName`: 你的 Azure Blob 存儲帳戶名。
- `markdown-image.azure.connectionString`: 你的 Azure 存儲連接字符串。
- `markdown-image.azure.container`: 你的 Azure 存儲容器名稱。

### 自定義設置項目

- `markdown-image.DIY.path`: 你寫的代碼的路徑。你的代碼必須 exports 一個像 `async function (filePath:string, savePath:string, markdownPath:string):string` 的函數。
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
* 圖標來自 [www.flaticon.com](https://www.flaticon.com/) 的 [Good Ware](https://www.flaticon.com/authors/good-ware)

**Enjoy!**
