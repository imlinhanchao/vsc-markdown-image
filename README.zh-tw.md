[English Readme](README.md) / [简体中文说明](README.zh-cn.md) / 繁體中文說明

# Markdown Image

一個用於方便的在 Markdown 中插入圖片的擴展，支持將圖片存放在本地或第三方的圖床或對象存儲。

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [贊助開發者](http://sponsor.hancel.org)

## 功能

1. 可複製圖片文件或截圖粘貼，快捷键 `Ctrl + Shift + V`，或右键菜单`粘贴图片`。
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

## 擴展設置項目

### 基本設置項目

- `markdown-image.base.uploadMethod`: 上傳圖片的方式，根據不同的方式，須在設置不同的項目。
- `markdown-image.base.fileNameFormat`: 圖片文件命名格式化字符串。支持多種變量做格式化，可同時配置文件夾格式，具體見設置。

### Local 设置项目

- `markdown-image.local.path`: 圖片本地存放路徑，支持相對路徑，相對於所粘貼的 Markdown 文件。 `/` 表示打開的文件夾根目錄。若路徑不存在，將會自動創建。

### Coding 設置項目

- `markdown-image.coding.token`: Coding 的個人[訪問令牌](https://help.coding.net/docs/member/tokens.html)，用於訪問倉庫，上傳圖片。
- `markdown-image.coding.repository`: 所要上传的目的仓库，比如：`https://coding-demo.coding.net/p/coding-demo/d/coding-demo/git`
- `markdown-image.coding.path`: 圖片存放的倉庫目錄，默認為根目錄。

### Imgur 設置項目

- `markdown-image.imgur.clientId`: 在 `imgur` 註冊的`Client Id`。您可以在[這裡](https://api.imgur.com/oauth2/addclient)註冊。
- `markdown-image.imgur.httpProxy`: 設置訪問的 HTTP 代理。

### SM.MS 設置項目

- `markdown-image.sm_ms.token`: SM.MS Secret Token。您可以註冊一個帳戶，然後訪問 [API Access](https://sm.ms/home/apitoken) 頁面生成。

### 七牛設置項目

- `markdown-image.qiniu.accessKey`: 七牛賬戶的 Access Key。
- `markdown-image.qiniu.secretKey`: 七牛賬戶的 Secret Key。
- `markdown-image.qiniu.bucket`: 七牛的對象存儲空間名。
- `markdown-image.qiniu.domain`: 七牛空间绑定的域名。
- `markdown-image.qiniu.zone`: 七牛空間的存儲區域。

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

## 發布歷史

### 1.1.19
- 修復 Local 模式設置保存到項目根目錄，實際保存到磁盤根目錄問題。

### 1.1.18
- 修復 Local 模式不能使用絕對路徑的問題。

### 1.1.17
- 添加了對 Cloudflare CDN 支持.
- 新增了包括以下新的設置：
  * `markdown-image.cloudflare.accountId`
  * `markdown-image.cloudflare.apiToken`

### 1.1.16
- 添加支持上傳圖像到 Github 存儲庫。

### 1.1.15
- 添加文件格式化變量 `prompt`。 可以在粘貼圖像時通過輸入框輸入自定義名稱。

### 1.1.14
- 更新 Coding-Picbed 修復上傳到 Coding 錯誤。

### 1.1.13
- 添加了設置项目 `markdown-image.local.referencePath` 用于支持修改在 Markdown 文件中的图片引用路徑。

### 1.1.12
- 添加支持在 jupyter 文件中的粘貼圖像。

### [1.1.11]
- 更新了Cloudinary CDN 以使用 `markdown-image.base.fileNameFormat` 設置保存文件路徑。文件路徑若已存在，將提示是否覆蓋。

### 1.1.10
- 添加了對 Cloudinary CDN 的支持
- 新增了包括以下新的設置：
  * `markdown-image.cloudinary.cloudName`
  * `markdown-image.cloudinary.apiKey`
  * `markdown-image.cloudinary.apiSecret`
  * `markdown-image.cloudinary.folder`

### 1.1.9
- 添加設置選項 `markdown-image.base.codeType` 和 `markdown-image.base.imageWidth` 用於設置圖片最大寬度。

### 1.1.8
- 修正 VSCode 會緩存 `DIY` 路徑代碼，導致修改無法即時生效的問題。

### 1.1.7
- 新增一個選項用於切換是否對 URL 編碼。
  
### 1.1.6
- 修正擴展Log等級，避免干擾其他擴展開發者。
- 更新替換文件後動作。 

### 1.1.5
- 修正 `Data URL` 設定項目説明。

### 1.1.4
- 新增插入 Markdown 圖片方式： `Data URL`.
- 修正粘貼多個文件無效問題。

### 1.1.3
- 修复了文件名變量`${path}`導致在 Windows 系統下存在兩級以上 Markdown 路徑時，`Coding` 圖床上傳失敗問題。

### 1.1.2
- 再一次修復了粘貼複製的圖片時，路徑包含中文提示無法找到問題。😂

### 1.1.1
- 修復了粘貼複製的圖片時，路徑包含中文提示無法找到問題。

### 1.1.0
- 添加了 Beta 功能，支持粘貼富文本格式。（僅支持Windows）

### 1.0.14
- 修復了與 Windows 7 不兼容的問題。

### 1.0.13
- 修復了在 Windows 中獲取剪貼板圖片的路徑分辨率錯誤的問題。

### 1.0.12
- 添加了文件名變量 `${path}`： 正在編輯的 Markdown 文件相對於根目錄的路徑。

### 1.0.11
- 修正 `sm.ms` API 地址。
- 修復了在 Linux 中找不到帶空格的文件名的問題。
- 添加了 `sm.ms` 沒有設置 token 的提示。
### 1.0.10
- 修復變量 `$mdname` 沒有去除非 `md` 後綴名的問題。

### 1.0.9
- 修復了文件名格式化日期小時獲取錯誤的問題。

### 1.0.8
- 加入支持 mdx 文件。

### 1.0.7
- 修復了無法自動在 MacOS 和 Linux 上啟動擴展名主頁的問題。
- 修復了圖片地址冒號被錯誤轉義的問題。

### 1.0.6

- 修正日期變量沒有考慮時區的問題。

### 1.0.5
- 修正包含空格的文件名無法預覽的問題。
- 修正 ${rand} 變量不可用的問題。

### 1.0.4

- 更新贊助鏈接。

### 1.0.3

- 添加贊助鏈接。

### 1.0.2

- 修正圖片替換提示錯誤。

### 1.0.1

- 更新 Readme。

### 1.0.0

- 初版发布。

-----------------------------------------------------------------------------------------------------------

### 其他

* [GitHub](https://github.com/imlinhanchao/vsc-markdown-image)
* [VSCode Market](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)
* 圖標來自 [www.flaticon.com](https://www.flaticon.com/) 的 [Good Ware](https://www.flaticon.com/authors/good-ware)

**Enjoy!**
