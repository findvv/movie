var co = require('co');
var fs = require('fs');
var SMysql = require('sm-mysql');
var download = require('download');
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
function getImg(title,img,num) {
    return new Promise((resolve, reject)=>{
        let newNum = num < 10 ? ('0' + num) : num;
        console.log(newNum);
        download(img).then(data => {
            fs.writeFile(`../manhua/${title}/${newNum}.jpg`, data, function(err){
                resolve();
            });
        });
    });
}
function getData(data) {
    return new Promise((resolve,reject)=>{
        let imgs = JSON.parse(data.imgs),
            title = data.title;

        console.log(`正在下载${title}`);
        fs.mkdir(`../manhua/${title}`,0777, function () {
            co(function* (){
                for(var i = 0; i < imgs.length; i++) {
                    yield getImg(title, imgs[i], i);
                }
            }).then(function(){
                resolve();
            });
        });
    })
}
function step2(data){
    return new Promise((resolve,reject)=>{
        co(function* (){
            for(let d of data) {
                yield getData(d);
            }
        }).then(function(){
            resolve();
        });
    });
}
function* steps(){
    let data = yield step1();
    yield step2(data);
}
co(steps);
