param($imagePath)

chcp 65001 | out-null
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Text.Encoding

($html = [System.Windows.Forms.Clipboard]::GetText([System.Windows.Forms.TextDataFormat]::Html)) | out-null

$html

