param($imagePath)

# Adapted from https://github.com/octan3/img-clipboard-dump/blob/master/dump-clipboard-png.ps1
chcp 65001

Add-Type -Assembly PresentationCore

if (-not $imagePath) {
    "image path unspecified"
    Exit 1
}

$img = [Windows.Clipboard]::GetImage()

if ($null -eq $img) {
    $files = [Windows.Clipboard]::GetFileDropList()
    if ($null -eq $files) {
        "no image"
        Exit 1
    }
    $files
    Exit 0
}

try {
    $stream = [IO.File]::Open($imagePath, [IO.FileMode]::Create)
    $fcb = New-Object Windows.Media.Imaging.FormatConvertedBitmap($img, $img.Format, $null, 100)
    $encoder = New-Object Windows.Media.Imaging.PngBitmapEncoder
    $encoder.Frames.Add([Windows.Media.Imaging.BitmapFrame]::Create($fcb)) | Out-Null
    $encoder.Save($stream)
}
finally {
    if ($stream) { $stream.Dispose() }
}

$imagePath

Exit 0
