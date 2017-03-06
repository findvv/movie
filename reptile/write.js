var db = require('../db.js');
var SMysql = require('sm-mysql');
var fs = require('fs');
fs.readFile('result.txt','utf-8', function(err,data){ 
    (new SMysql(db,'music')).insert('wangyi', JSON.parse(data)).end(function(data){
        console.log(data[0]);
    })
});