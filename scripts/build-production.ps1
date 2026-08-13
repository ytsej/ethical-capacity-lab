$ErrorActionPreference = "Stop"
$env:NEXT_PUBLIC_SITE_URL = "https://ethicalcapacitylab.org"
$env:SITE_ENV = "production"

npm.cmd run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
