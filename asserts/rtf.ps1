param($imagePath)

chcp 65001 | out-null
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Text.Encoding

$data = [System.Windows.Forms.Clipboard]::GetDataObject()
$html = $data.GetData([System.Windows.Forms.DataFormats]::Html)
$html

