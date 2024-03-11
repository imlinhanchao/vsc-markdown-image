# Change Log
All notable changes to the "markdown-image" extension will be documented in this file.

## [1.1.40] - 2024-03-11

### Added
- Added a new setting item `markdown-image.s3.cdn` to set the s3 cdn url.

## [1.1.39] - 2024-03-06

### Added
- Add `Content-Type` to s3 upload method.

## [1.1.38] - 2024-02-24

### Added
- Supports Azure Blob Storage Passwordless authentication method.

## [1.1.37] - 2024-02-17

### Added
- Add support for Azure Storage.

## [1.1.36] - 2023-08-22

### Fixed
- Fixed the issue where the placeholder `filename` was not using the value calculated by `fileNameFormat`.

## [1.1.35] - 2023-06-30

### Fixed
- Fixed the issue where only the first occurrence of the same variable for `fileNameFormat` was effective.

## [1.1.34] - 2023-06-28

### Added
- Added a new setting item `markdown-image.base.altFormat` to set the placeholder for image code.

## [1.1.33] - 2023-06-04

### Added
- Added a new setting item `markdown-image.base.uploadMethods` to support concurrent uploads with multiple upload methods.
- Added a new setting item `markdown-image.base.fileFormat` to set the file format for saving clipboard images.
- Supported pasting images into unconventional editing windows.

### Deprecated
- Removed the deprecated Coding image upload method.

## [1.1.30] - 2023-05-15

### Added
- Added new setting `markdown-image.github.httpProxy` to settting GitHub http proxy.

## [1.1.29] - 2023-05-02

### Fixed
- Fix failed to get image from clipboard on deepin.

## [1.1.28] - 2023-04-10

### Added
- Support group setting.
- Add support for remote mode.
- Add SFTP upload method.
- Includes the following new settings:
  - `markdown-image.sftp.host`
  - `markdown-image.sftp.port`
  - `markdown-image.sftp.username`
  - `markdown-image.sftp.password`
  - `markdown-image.sftp.privateKeyPath`
  - `markdown-image.sftp.path`
  - `markdown-image.sftp.referencePath`

## [1.1.27] - 2023-04-07

### Added
- Add support for S3 compatible providers.
- Includes the following new settings:
  - `markdown-image.s3.endpoint`
  - `markdown-image.s3.region`
  - `markdown-image.s3.bucketName`
  - `markdown-image.s3.accessKeyId`
  - `markdown-image.s3.secretAccessKey`
  
## [1.1.26] - 2022-12-09
### Added
- Add support for Upyun.
- Includes the following new settings:
  * `markdown-image.upyun.bucket`
  * `markdown-image.upyun.domain`
  * `markdown-image.upyun.operator`
  * `markdown-image.upyun.password`
  * `markdown-image.upyun.path`
  * `markdown-image.upyun.link`

## [1.1.25] - 2022-12-09
### Fixed
- Fixed image url of GitHub CDN encode wrong when enable `markdown-image.base.urlEncode` .

## [1.1.24] - 2022-12-06
### Fixed
- Fixed some bug of the option `markdown-image.local.referencePath`.
- Fixed the `alt` count of image restart when restarted extension.

## [1.1.23] - 2022-11-30
### Added
- Added new setting `markdown-image.github.cdn` to settting GitHub CDN Format Address.

## [1.1.22] - 2022-05-10
### Fixed
- Fixed upload wrong path in GitHub Mode.

## [1.1.21] - 2022-05-09
### Fixed
- Fixed the problem of uploading to GitHub when the file path contains Chinese.

## [1.1.20] - 2022-04-08
- Fixed bug of the setting start with `/` on `local.referencePath`.

## [1.1.19] - 2022-02-23
### Fixed
- Fixed local mode always save to disk root path.

## [1.1.18] - 2022-02-22
### Fixed
- Fixed local mode can't use absolute path.

## [1.1.17] - 2022-01-03
### Added
- Add support for Cloudflare Images.
- Includes the following new settings:
  * `markdown-image.cloudflare.accountId`
  * `markdown-image.cloudflare.apiToken`

## [1.1.16] - 2021-12-06
### Added
- Added to support upload image to github repository.

## [1.1.15] - 2021-11-24
### Added
- Added file format variable `prompt`. Makes it possible to enter a custom name through an input prompt when pasting the image.

## [1.1.14] - 2021-09-06
### Updated
- Update Coding Picbed Package to fixed upload to coding error.

## [1.1.13] - 2021-08-20
### Added
- Added new setting `markdown-image.local.referencePath` to support DIY reference path in markdown file.

## [1.1.12] - 2021-08-04
### Added
- Added to support paste image in Jupyter file.

## [1.1.11] - 2021-07-08
### Fixed
- Updated Cloudinary CDN to use the `markdown-image.base.fileNameFormat` setting. The extension will check for existing files and will prompt to overwrite if necessary.

## [1.1.10] - 2021-07-05
### Added
- Added support for Cloudinary CDN
- Includes the following new settings:
  * `markdown-image.cloudinary.cloudName`
  * `markdown-image.cloudinary.apiKey`
  * `markdown-image.cloudinary.apiSecret`
  * `markdown-image.cloudinary.folder`

## [1.1.9] - 2021-05-17
### Added
- Added setting options `markdown-image.base.codeType` and `markdown-image.base.imageWidth` use to set the maximum image width.

## [1.1.8] - 2021-04-25
### Fixed
- Fixed vscode caches the `DIY` path code, causing a question that cannot be changed immediately.

## [1.1.7] - 2021-04-16
### Added
- Added a option to switch whether url encode.

## [1.1.6] - 2021-04-13
### Fixed
- Fixed extension log level.
### Changed
- Update action after replace file.

## [1.1.5] - 2021-03-29
### Fixed
- Fixed `Data URL` Setting Description.

## [1.1.4] - 2021-03-26
### Added
- Added upload method `Data URL`.
### Fixed
- Fixed paste multiple documents invalid.

## [1.1.3] - 2021-03-26
### Fixed
- Fixed the filename format variable `${path}` were uploaded to the `Coding` failure in the Windows.

## [1.1.2] - 2021-03-26
### Fixed
- Fixed the path contains Chinese prompts cannot be found when pasting the copied picture again. 😂

## [1.1.1] - 2021-03-16
### Fixed
- Fixed the path contains Chinese prompts cannot be found when pasting the copied picture.

## [1.1.0] - 2021-02-04
### Added
- Added Beta feature, support paste rich text. (Only supports Windows)

## [1.0.14] - 2021-01-29
### Fixed
- Fixed incompatibility with Windows 7.

## [1.0.13] - 2021-01-29
### Fixed
- Fixed getting the path resolution error of the clipboard picture in Windows.

## [1.0.12] - 2021-01-21
### Added
- Added file name variable `${path}`: "The path of the Markdown file being edited relative to the root directory."

## [1.0.11] - 2021-01-06
### Fixed
- Fixed api url of `sm.ms`.
- Fixed the file name with spaces cannot be found in Linux.
### Added
- Added prompt without token in `sm.ms`.

## [1.0.10] - 2020-12-06
### Fixed
- Fix the variable `$mdname` does not remove the extension name of `md`.

## [1.0.9] - 2020-10-19
### Fixed
- Fixed the problem of getting wrong date and hour in filename formatting.

## [1.0.8] - 2020-07-22
### Added
- Added mdx support.

## [1.0.7] - 2020-07-21
### Fixed
- Fixed launch extension home page failed at MacOS and Linux.
- Fixed the colon of the picture address is incorrectly encode.

## [1.0.6] - 2020-07-16
### Fixed
- Fixed the date variable has not consider the time zone.

## [1.0.5] - 2020-07-01
### Fixed
- Fixed file name include space could not preview.
- Fixed random variable not work.

## [1.0.4] - 2020-05-18
### Updated
- Update sponsored links.

## [1.0.3] - 2020-05-15
### Added
- Add sponsored links.

## [1.0.2] - 2020-05-09
### Fixed
- Fixed replace notice bug.

## [1.0.1] - 2020-05-09
### Fixed
- Fixed Readme.

## [1.0.0] - 2020-05-09
- Finish First Version.