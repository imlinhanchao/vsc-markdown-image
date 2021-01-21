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
- 
### 自定义设置项目

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
