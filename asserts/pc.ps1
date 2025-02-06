param($imagePath)

# Adapted from https://github.com/octan3/img-clipboard-dump/blob/master/dump-clipboard-png.ps1
chcp 65001

Add-Type -Assembly PresentationCore
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

if (-not $imagePath) {
    "no image"
    Exit 1
}

$sourceFormat = $img.Format
$hasAlpha = @(
    [Windows.Media.PixelFormats]::Bgra32,
    [Windows.Media.PixelFormats]::Pbgra32,
    [Windows.Media.PixelFormats]::Prgba64,
    [Windows.Media.PixelFormats]::Rgba64
) -contains $sourceFormat

$targetFormat = if ($hasAlpha) {
    [Windows.Media.PixelFormats]::Pbgra32
} else {
    [Windows.Media.PixelFormats]::Rgb24
}

$fcb = New-Object Windows.Media.Imaging.FormatConvertedBitmap($img, $targetFormat, $null, 0)

try {
    $stream = [IO.File]::Open($imagePath, [IO.FileMode]::OpenOrCreate)
    $encoder = New-Object Windows.Media.Imaging.PngBitmapEncoder
    $encoder.Frames.Add([Windows.Media.Imaging.BitmapFrame]::Create($fcb)) | Out-Null
    $encoder.Save($stream)
}
finally {
    if ($stream) { $stream.Dispose() }
}

$imagePath

Exit 0
