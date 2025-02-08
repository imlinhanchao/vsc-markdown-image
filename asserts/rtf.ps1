Add-Type -Assembly PresentationCore

($html = [Windows.Clipboard]::GetData([Windows.DataFormats]::Html)) | out-null

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::WriteLine($html)

