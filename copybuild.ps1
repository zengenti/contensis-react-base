param (
  [string]$target
)

# $target = $target + "\node_modules\zengenti-isomorphic-base"
$target = $target + "\node_modules\@zengenti\contensis-react-base"

# npm run build:lib
npm run roll:lib
Copy-Item -Path .\package.json -Destination $target
Copy-Item -Path .\package-lock.json -Destination $target
Copy-Item -Path .\cjs -Filter *.js* -Destination $target -Recurse -Force
# Copy-Item -Path .\cjs -Filter *.js.map -Destination $target -Recurse
Copy-Item -Path .\esm -Filter *.js* -Destination $target -Recurse -Force
# Copy-Item -Path .\esm -Filter *.js.map -Destination $target -Recurse
Copy-Item -Path .\client -Filter *.* -Destination $target -Recurse -Force
Copy-Item -Path .\redux -Filter *.* -Destination $target -Recurse -Force
Copy-Item -Path .\routing -Filter *.* -Destination $target -Recurse -Force
Copy-Item -Path .\search -Filter *.* -Destination $target -Recurse -Force
Copy-Item -Path .\user -Filter *.* -Destination $target -Recurse -Force
Copy-Item -Path .\util -Filter *.* -Destination $target -Recurse -Force
# Copy-Item -Path .\zengenti-isomorphic-base.js -Destination $target
# Copy-Item -Path .\zengenti-isomorphic-base.js.map -Destination $target
# Copy-Item -Path .\client.js -Destination $target
# Copy-Item -Path .\client.js.map -Destination $target
# Copy-Item -Path .\redux.js -Destination $target
# Copy-Item -Path .\redux.js.map -Destination $target
# Copy-Item -Path .\routing.js -Destination $target
# Copy-Item -Path .\routing.js.map -Destination $target
# Copy-Item -Path .\search.js -Destination $target
# Copy-Item -Path .\search.js.map -Destination $target
# Copy-Item -Path .\user.js -Destination $target
# Copy-Item -Path .\user.js.map -Destination $target
# Copy-Item -Path .\util.js -Destination $target
# Copy-Item -Path .\util.js.map -Destination $target
