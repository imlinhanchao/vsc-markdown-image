param($imagePath)

chcp 65001 | out-null
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Text.Encoding

function EncodingUTF8($data){
    Write-Output $data;
    return [System.Text.UTF8Encoding]::UTF8.GetString([System.Text.Encoding]::Default.GetBytes($data));
}

$data = [System.Windows.Forms.Clipboard]::GetDataObject() 
$html = $data.GetData([System.Windows.Forms.DataFormats]::Html)
if ($null -ne $html) {
    $html = EncodingUTF8($html)
} 
$html