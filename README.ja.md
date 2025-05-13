[English Readme](README.md) / [简体中文说明](README.zh-cn.md) / [繁體中文說明](README.zh-tw.md) / 日本語説明

# Markdown Image

Markdownで画像を簡単に挿入できる拡張機能です。ローカルまたはサードパーティのCDNサービスに画像を保存することをサポートしています。

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [赞助开发者](http://sponsor.hancel.org)

## Features

1. 画像ファイルのコピーやスクリーンショットのペーストが可能。ショートカットキーは `Alt + Shift + V`、または右クリックメニューの「Paste Image」。
2. 自動的にMarkdownコードを生成して挿入します。
3. `Imgur`、`Qiniu`、`SM.MS`、`Cloudflare`、`Cloudinary`、`S3`、`Azure Storage`などのCDNサービスをサポートし、設定可能です。デフォルトはローカルで、Markdownファイルがあるフォルダを開く必要があります。
4. 独自コードを設定して画像をアップロードすることも可能です。
5. Windows、MacOS、Linuxをサポートしています。

## Requirements

Linux環境では xclip をインストールする必要があります。

Ubuntu:

```bash
sudo apt install xclip
```

CentOS:

```bash
sudo yum install epel-release.noarch
sudo yum install xclip
```

## Notice

Remote Modeで使用する場合は、次のように `remote.extensionKind` を設定してください:

```json
"remote.extensionKind": {
  "hancel.markdown-image": [
    "ui"
  ]
}
```

また、リモート環境の作業スペースに画像を保存したい場合は、`SFTP` のアップロード方式を使用する必要があります。`Local` はRemote Modeでは使用できません。

## Extension Settings

### Base Settings

* `markdown-image.base.uploadMethod`: 画像のアップロード方法を指定します。ローカルまたは他の画像CDNサービスへアップロードします。
* `markdown-image.base.uploadMethods`: 複数のアップロード方式を並行して使うための設定です。ここに設定したアップロード結果はMarkdownファイルに挿入されません。
* `markdown-image.base.fileNameFormat`: アップロード時のファイル名形式。`Imgur` と `SM.MS` ではサポートされていません。利用できる変数については設定項目を参照してください。
* `markdown-image.base.codeType`: 画像コードの形式。`<img>` タグまたはMarkdown記法を設定できます。
* `markdown-image.base.codeFormat`: `markdown-image.base.codeType` を `DIY` に設定した場合の挿入コードの書式。
* `markdown-image.base.imageWidth`: 画像の最大幅。画像がこの幅より大きい場合は、この値に合わせられます。0に設定するとサイズ変更を行いません。
* `markdown-image.base.urlEncode`: 画像URLをURLエンコードするかどうかを設定します。

### Local Settings

* `markdown-image.local.path`: ローカルに保存する画像ディレクトリ（存在しない場合は自動で作成）。
* `markdown-image.local.referencePath`: Markdown内での参照パス形式（ファイル名は含まない）。空の場合は相対パスを使用します。ここで `#markdown-image.base.fileNameFormat#` の変数が使用可能です。例: `/images/${YY}-${MM}/`

### GitHub Settings

* `markdown-image.github.path`: リポジトリ内に画像をアップロードするディレクトリ（存在しない場合は自動で作成）。リポジトリは事前に初期化しておく必要があります。
* `markdown-image.github.token`: GitHubの個人[アクセストークン](https://github.com/settings/tokens)。
* `markdown-image.github.repository`: GitHubリポジトリ。例: `https://github.com/username/repository`
* `markdown-image.github.branch`: 画像を保存するGitHubリポジトリのブランチ。
* `markdown-image.github.cdn`: 使用するGitHub CDNアドレスの形式。`${username}` は `markdown-image.github.repository` のユーザー名、`${repository}` はリポジトリ名、`${branch}` は `markdown-image.github.branch` の値、`${filepath}` はリポジトリ内のアップロードパスを表します。
* `markdown-image.github.httpProxy`: HTTPプロキシを介してGitHubに接続する場合の設定。

### Imgur Settings

* `markdown-image.imgur.clientId`: Imgurで登録したClient ID。[こちら](https://api.imgur.com/oauth2/addclient)で登録可能です。
* `markdown-image.imgur.httpProxy`: HTTPプロキシを介してImgurに接続する場合の設定。

### SM.MS Settings

* `markdown-image.sm_ms.token`: SM.MSのAPIトークン（オプション）。アカウント登録後、[API Token](https://sm.ms/home/apitoken)ページで秘密トークンを生成可能です。

### Qiniu Settings

* `markdown-image.qiniu.accessKey`: アカウントのAccess Key。
* `markdown-image.qiniu.secretKey`: アカウントのSecret Key。
* `markdown-image.qiniu.bucket`: ストレージ名。
* `markdown-image.qiniu.domain`: ストレージのバインドドメイン。
* `markdown-image.qiniu.zone`: ストレージのゾーン。

### Upyun Settings

* `markdown-image.upyun.bucket`: アップロードするストレージ名。
* `markdown-image.upyun.domain`: ストレージ名にバインドされたドメイン。
* `markdown-image.upyun.operator`: Upyunのオペレーター名。
* `markdown-image.upyun.password`: Upyunオペレーターのパスワード。
* `markdown-image.upyun.path`: 画像を保存するパス。
* `markdown-image.upyun.link`: Upyunに接続するリンク。

### Cloudinary Settings

これらの値はCloudinaryのダッシュボードから確認できます

* `markdown-image.cloudinary.cloudName`: アカウント名。
* `markdown-image.cloudinary.apiKey`: アカウントのAPIキー。
* `markdown-image.cloudinary.apiSecret`: アカウントのAPIシークレット。
* `markdown-image.cloudinary.folder`: 画像をアップロードするフォルダ。

### Cloudflare Settings

これらの値はCloudflareのダッシュボードで確認できます

* `markdown-image.cloudflare.accountId`: アカウントID。
* `markdown-image.cloudflare.apiToken`: Cloudflare ImagesのAPIトークン。

### S3 Settings

これらの値はS3サービスプロバイダのダッシュボードで確認できます

* `markdown-image.s3.endpoint`: S3 APIのエンドポイント。バケット設定から取得可能です。
* `markdown-image.s3.region`: S3バケットのリージョン。バケット設定から取得可能です。
* `markdown-image.s3.bucketName`: 画像をアップロードするS3バケット名。バケットへのアクセスはパブリックである必要があります。
* `markdown-image.s3.accessKeyId`: S3 APIのAccess Key ID。
* `markdown-image.s3.secretAccessKey`: S3のシークレットアクセスキー。
* `markdown-image.s3.cdn`: S3のCDNアドレス。`${bucket}` `${region}` `${pathname}` `${filepath}`などの変数を使用できます。例: `https://${bucket}.${region}.s3.amazonaws.com/${pathname}/${filepath}`

### SFTP Settings

* `markdown-image.sftp.host`: リモートサーバーのホスト名。
* `markdown-image.sftp.port`: リモートサーバーのSSHポート。
* `markdown-image.sftp.username`: リモートサーバーのユーザー名。
* `markdown-image.sftp.password`: リモートサーバーのパスワード。
* `markdown-image.sftp.privateKeyPath`: リモートサーバーにアクセスするための秘密鍵パス。
* `markdown-image.sftp.path`: リモート環境に保存する画像ディレクトリ（存在しない場合は自動で作成）。注意: ここでは変数は使用できません。`#markdown-image.base.fileNameFormat#` の変数はここでは使えません。
* `markdown-image.sftp.referencePath`: Markdown内での参照パス形式（ファイル名は含まない）。空の場合は相対パスを使用。`#markdown-image.base.fileNameFormat#` の変数が使用可能です。例: `/images/${YY}-${MM}/`

### Azure Storage Settings

* `markdown-image.azure.authenticationMethod`: Azure Blob Storageアカウントに対する認証方法を指定します。デフォルトは `Passwordless` です。[詳細はこちら](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli#authenticate-to-azure-and-authorize-access-to-blob-data)。
* `markdown-image.azure.accountName`: Azure Blob Storageアカウント名。
* `markdown-image.azure.connectionString`: Azure Storageアカウントの接続文字列。
* `markdown-image.azure.container`: 画像をアップロードするコンテナー名。

### DIY Settings

* `markdown-image.DIY.path`: 独自に記述するコードのパス。ここには `async function (filePath:string, savePath:string, markdownPath:string):string` をエクスポートする関数を含む必要があります。
  例:
  ```javascript
  const path = require("path");
  module.exports = async function (filePath, savePath, markdownPath) {
    // 画像アクセス用のリンクを返す
    return path.relative(path.dirname(markdownPath), filePath);
  };
  ```

### Others

* [GitHub](https://github.com/imlinhanchao/vsc-markdown-image)
* [VSCode Market](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)
* アイコン: [www.flaticon.com](https://www.flaticon.com/) の [Good Ware](https://www.flaticon.com/authors/good-ware) より作成

**Enjoy!**
