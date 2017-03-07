var db = require('../db.js');
var SMysql = require('sm-mysql');
var fs = require('fs');
var co = require('co');
var files = [];
function ScanDir(path) {
  var that = this
  if (fs.statSync(path).isFile()) {
    return files.push(path)
  }
  try {
    fs.readdirSync(path).forEach(function (file) {
      ScanDir.call(that, path + file)
    })
  } catch (e) {
  }
}
ScanDir('../result/');
function writeSql(file) {
    return new Promise(function(resolve,reject){
        fs.readFile(file,'utf-8', function(err,data){ 
            (new SMysql(db,'music')).insert('wangyi', JSON.parse(data)).end(function(data){
                console.log(file);
                resolve();
            });
        });
    });
}
setTimeout(function(){
    co(function* (){
        for(var file of files) {
            yield writeSql(file);
        }
    }).then(function(){console.log('over');});
},1000);

