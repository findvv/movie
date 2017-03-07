const fs = require('fs')

let files = []
function ScanDir(path) {
  let that = this
  if (fs.statSync(path).isFile()) {
    return files.push(path)
  }
  try {
    fs.readdirSync(path).forEach(function (file) {
      ScanDir.call(that, path + '/' + file)
    })
  } catch (e) {
    console.log(1);
  }
}

ScanDir('../result/')
console.log(files)