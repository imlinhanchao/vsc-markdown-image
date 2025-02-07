English Readme / [简体中文说明](README.zh-cn.md) / [繁體中文說明](README.zh-tw.md)

# Markdown Image

An extension for conveniently inserting pictures in Markdown, which supports storing pictures in local or third-party CDN service.

❤ [Sponsor me](https://www.paypal.me/imlinhanchao) / [赞助开发者](http://sponsor.hancel.org)

## Features

1. Copy image files or paste screenshots, Shortcut key `Alt + Shift + V`, or right-click menu `Paste Image`.
2. Automatically generate Markdown code insertion.
3. Configurable to support `Imgur`, `Qiniu`, `SM.MS`, `Cloudflare`, `Cloudinary`, `S3`, `Azure Storage` and other CDN service. The default is local, you need to open the folder where the Markdown file is located.
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

## Notice

If you want to use in the Remote Mode, please set `remote.extensionKind` like this:

```json
"remote.extensionKind": {
  "hancel.markdown-image": [
    "ui"
  ]
}
```

And if you want to save image in your remote workplace, you must use `SFTP` upload method. `Local` couldn't use in Remote Mode.

## Extension Settings

### Base Settings

- `markdown-image.base.uploadMethod`: Method to upload pictures. To the local or another picture CDN service.
- `markdown-image.base.uploadMethods`: The upload method for parallel upload. The upload results of the upload method set here will not be inserted into the Markdown file.
- `markdown-image.base.fileNameFormat`: The filename format for upload. Not Support in `Imgur` and `SM.MS`. You can use some variables. You can find more in setting.
- `markdown-image.base.codeType`: The type of image code, you can set to `<img>` tag or markdown
- `markdown-image.base.codeFormat`: Insert code format, effective when `markdown-image.base.codeType` is set to `DIY`.
- `markdown-image.base.imageWidth`: The maximum width of the image, if the image is greater than this width, the width is set to this value. Set to 0 means not change.
- `markdown-image.base.urlEncode`: Whether URL encode for the url of image.

### Local Settings

- `markdown-image.local.path`: Picture storage directory that in the local (automatically created if it does not exist).
- `markdown-image.local.referencePath`: The reference path format in markdown(not include file name). Empty means use relative path. You can use variable of `#markdown-image.base.fileNameFormat#` in here. For example: `/images/${YY}-${MM}/`

### GitHub Settings

- `markdown-image.github.path`: Picture upload directory that in the repository (automatically created if it does not exist). The repository must initialization first.
- `markdown-image.github.token`: GitHub person [access token](https://github.com/settings/tokens).
- `markdown-image.github.repository`: GitHub repository, for example: `https://github.com/username/repository`
- `markdown-image.github.branch`: GitHub repository branch to save.
- `markdown-image.github.cdn`: The github cdn address format to be used, `${username}` is the username of `markdown-image.github.repository`, and `${repository}` is the repository name. `${branch}` is the value of `markdown-image.github.branch`. `${filepath}` is the upload path in repository.
- `markdown-image.github.httpProxy`: Connect to Github via http proxy.

### Imgur Settings

- `markdown-image.imgur.clientId`: The client id registered with imgur. You can registed it at [here](https://api.imgur.com/oauth2/addclient).
- `markdown-image.imgur.httpProxy`: Connect to Imgur via http proxy.

### SM.MS Settings

- `markdown-image.sm_ms.token`: SM.MS API token (Options). You can register an account and then visit [API Token](https://sm.ms/home/apitoken) Page to generate secret token.

### Qiniu Settings

- `markdown-image.qiniu.accessKey`: The Access Key of account.
- `markdown-image.qiniu.secretKey`: The Secret Key of account.
- `markdown-image.qiniu.bucket`: The storage name.
- `markdown-image.qiniu.domain`: Bound domain name of storage.
- `markdown-image.qiniu.zone`: Zone of storage.

### Upyun Settings

- `markdown-image.upyun.bucket`: Storge name of upload.
- `markdown-image.upyun.domain`: Domain bind with storge name.
- `markdown-image.upyun.operator`: Operator of upyun.
- `markdown-image.upyun.password`: Password of upyun operator.
- `markdown-image.upyun.path`: The path that img store.
- `markdown-image.upyun.link`: The link that connect to upyun.

### Cloudinary Settings

These values can be found on your Cloudinary Dashboard

- `markdown-image.cloudinary.cloudName`: Your user account name.
- `markdown-image.cloudinary.apiKey`: API key for your account.
- `markdown-image.cloudinary.apiSecret`: API secret for your account.
- `markdown-image.cloudinary.folder`: Folder to upload the image to.

### Cloudflare Settings

These values can be found on your Cloudflare dashboard

- `markdown-image.cloudflare.accountId`: Your account ID.
- `markdown-image.cloudflare.apiToken`: Cloudflare Images API token.

### S3 Settings

These values can be found in your S3 service provider dashboard

- `markdown-image.s3.endpoint`: The endpoint for S3 API, can be obtained from bucket setting.
- `markdown-image.s3.region`: The region for the S3 bucket, can be obtained from bucket setting.
- `markdown-image.s3.bucketName`: The name of the S3 bucket to upload images to. Access to the bucket should be public.
- `markdown-image.s3.accessKeyId`: Your S3 API access key ID.
- `markdown-image.s3.secretAccessKey`: Your S3 secret access key.
- `markdown-image.s3.cdn`: Your S3 CDN Url. You can use variable `${bucket}` `${region}` `${pathname}` and `${filepath}`. For example: `https://${bucket}.${region}.s3.amazonaws.com/${pathname}/${filepath}`.

### SFTP Settings

- `markdown-image.sftp.host`: The host of the remote server.
- `markdown-image.sftp.port`: The ssh port of the remote server.
- `markdown-image.sftp.username`: The username of the remote server.
- `markdown-image.sftp.password`: The password of the remote server.
- `markdown-image.sftp.privateKeyPath`: The private key path of the remote server.
- `markdown-image.sftp.path`: Picture storage directory that in the remote (automatically created if it does not exist). Notice: You can't use variable in here. You can use variable in `#markdown-image.base.fileNameFormat#`.
- `markdown-image.sftp.referencePath`: The reference path format in markdown(not include file name). Empty means use relative path. You can use variable of `#markdown-image.base.fileNameFormat#` in here. For example: `/images/${YY}-${MM}/`

### Azure Storage Settings
- `markdown-image.azure.authenticationMethod`: The authentication method to use for the Azure Blob Storage account. The default is `Passwordless`. You can obtain more information from [here](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli#authenticate-to-azure-and-authorize-access-to-blob-data).
- `markdown-image.azure.accountName`: Your Azure Blob Storage account.
- `markdown-image.azure.connectionString`: The connection string of the Azure Storage account.
- `markdown-image.azure.container`: The name of the container to upload images to.

### DIY Settings

- `markdown-image.DIY.path`: The Code Path what you write. Your code must exports a function as `async function (filePath:string, savePath:string, markdownPath:string):string`.
  For example:
  ```javascript
  const path = require("path");
  module.exports = async function (filePath, savePath, markdownPath) {
    // Return a picture access link
    return path.relative(path.dirname(markdownPath), filePath);
  };
  ```

### Others

- [GitHub](https://github.com/imlinhanchao/vsc-markdown-image)
- [VSCode Market](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)
- Icons made by [Good Ware](https://www.flaticon.com/authors/good-ware) from [www.flaticon.com](https://www.flaticon.com/)

**Enjoy!**
