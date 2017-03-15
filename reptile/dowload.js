'use strict';
var co = require('co');
var fs = require('fs');
var SMysql = require('sm-mysql');
var download = require('download');
var arr = [];
var db = {  
          host     : 'zzxzzx2017-zzxzzx2017.v2.tenxapp.com',  
          user     : 'root',  
          password : 'ZZX137623',  
          port     : '20518'
        };

function step1(){
    return new Promise((resolve,reject)=>{
        var sMysql = new SMysql(db,'manhua');

        sMysql.search('haizeiwang').end(function(data) {
            resolve(data[0]);
        });
    })
}
function getData(data) {
    return new Promise((resolve,reject)=>{
        
    })
}
function step2(data){
    return new Promise((resolve,reject)=>{
        co(function* (){
            for(let d of data) {
                yield getData(d);
            }
        }).then(resolve);
    });
}
download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));
function* steps(){
    let data = yield step1();
    yield step2(data);
}