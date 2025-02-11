param($imagePath)

# Adapted from https://github.com/octan3/img-clipboard-dump/blob/master/dump-clipboard-png.ps1
chcp 65001 | Out-Null

Add-Type -Assembly PresentationCore

$image = [System.Windows.Clipboard]::GetImage()
if (-not $image) {
    $fileDropList = [System.Windows.Clipboard]::GetFileDropList()
    if (-not $fileDropList) {
        Write-Host "no image in clipboard"
        Exit 1
    }
    Write-Host $fileDropList
    Exit 0
}

if (-not $imagePath) {
    Write-Host "image path unspecified"
    Exit 1
}

function Is-Bgra32AndMissingAlpha {
    param([System.Windows.Media.Imaging.BitmapSource] $source)

    if ($source.Format -ne [System.Windows.Media.PixelFormats]::Bgra32) {
        return $false
    }

    $stride = $source.PixelWidth * 4
    $pixelData = New-Object byte[] ($stride * $source.PixelHeight)

    try {
        $source.CopyPixels($pixelData, $stride, 0)
    } catch {
        return $false
    }

    for ($i = 0; $i -lt $pixelData.Length; $i += 4) {
        if ($pixelData[$i + 3] -gt 0) {
            return $false
        }
    }

    return $true
}

$targetFormat = if (-not @(
    [System.Windows.Media.PixelFormats]::Bgra32,
    [System.Windows.Media.PixelFormats]::Pbgra32,
    [System.Windows.Media.PixelFormats]::Rgba64,
    [System.Windows.Media.PixelFormats]::Prgba64,
    [System.Windows.Media.PixelFormats]::Rgba128Float
) -contains $image.Format) {
    [System.Windows.Media.PixelFormats]::Rgb24
} elseif (Is-Bgra32AndMissingAlpha -source $image) {
    [System.Windows.Media.PixelFormats]::Rgb24
} else {
    [System.Windows.Media.PixelFormats]::Bgra32
}

$fcb = New-Object Windows.Media.Imaging.FormatConvertedBitmap($image, $targetFormat, $null, 0)
$stream = [System.IO.File]::Open($imagePath, "Create")
$encoder = New-Object Windows.Media.Imaging.PngBitmapEncoder
$encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($fcb)) | Out-Null
$encoder.Save($stream) | Out-Null
$stream.Dispose() | Out-Null

Write-Host $imagePath
