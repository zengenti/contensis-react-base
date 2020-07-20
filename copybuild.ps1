param (
  [string]$target
)

$target = $target + "\node_modules\zengenti-isomorphic-base"
#$target = $target + "\node_modules\@zengenti\contensis-react-base"

npm run build:lib
Copy-Item -Path .\package.json -Destination $target
Copy-Item -Path .\package-lock.json -Destination $target
Copy-Item -Path .\zengenti-isomorphic-base.js -Destination $target
Copy-Item -Path .\zengenti-isomorphic-base.js.map -Destination $target
Copy-Item -Path .\client.js -Destination $target
Copy-Item -Path .\client.js.map -Destination $target
Copy-Item -Path .\redux.js -Destination $target
Copy-Item -Path .\redux.js.map -Destination $target
Copy-Item -Path .\routing.js -Destination $target
Copy-Item -Path .\routing.js.map -Destination $target
Copy-Item -Path .\search.js -Destination $target
Copy-Item -Path .\search.js.map -Destination $target
Copy-Item -Path .\user.js -Destination $target
Copy-Item -Path .\user.js.map -Destination $target
Copy-Item -Path .\util.js -Destination $target
Copy-Item -Path .\util.js.map -Destination $target
