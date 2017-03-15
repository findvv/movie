'use strict';
var charset = require('superagent-charset');
var request = require('superagent');
var superagent = charset(request);
var cheerio = require('cheerio');
var co = require('co');
var fs = require('fs');
var SMysql = require('sm-mysql');
var arr = [];
var db = {  
          host     : 'zzxzzx2017-zzxzzx2017.v2.tenxapp.com',  
          user     : 'root',  
          password : 'ZZX137623',  
          port     : '20518'
        };
function step1(){
    return new Promise((resolve, reject)=>{
        superagent
            .get('http://www.hanhande.com/manhua/op/')
            .charset('gb2312')
            .end((err,res)=>{
                var $ = cheerio.load(res.text),
                    lis = $('#g1 li');

                lis.each(function(){
                    // var index = $(this).index();

                    // if (index < 2) {
                        arr.push({
                            'title': $(this).find('a').attr('title'),
                            'url': $(this).find('a').attr('href')
                        });
                    // }
                });
                arr.reverse();
                resolve();
            });
    });
}
function step2(){
    console.log('开始计算页码');
    function son(i){
        return new Promise((resolve, reject)=>{
            var timeout = (Math.random() + 0.3) * 1000;
            setTimeout(function(){
                superagent
                .get(arr[i]['url'])
                .charset('gb2312')
                .end((err,res)=>{
                    var $ = cheerio.load(res.text),
                        page = $('.mhTit code').text(),
                        timeout = (Math.random() + 0.3) * 1000,
                        pg = page.match(/\/\d+/g)[0].match(/\d+/)[0];

                    console.log((i / arr.length).toFixed(4) * 100 + '%');
                    arr[i]['page'] = parseInt(pg);
                    resolve();
                });
            }, timeout);
        });
    }
    return new Promise((resolve, reject)=>{
        co(function* (){
            for(let i = 0; i < arr.length; i++) {
                yield son(i);
            }
        }).then(function(){
            resolve();
        });
    })
}
function step3(urls,pages) {
    console.log('开始访问每一话');
    function son(num, i) {
        return new Promise((resolve, reject)=>{
            var url = '',timeout = (Math.random() + 0.3) * 1000;
            if (i == 1) {
                url = arr[num]['url'];
            } else {
                url = `${arr[num]['url'].split('.shtml')[0]}_${i}.shtml`;
            }
            setTimeout(function(){
                superagent
                .get(url)
                .charset('gb2312')
                .end((err,res)=>{
                    var $ = cheerio.load(res.text),
                        timeout = (Math.random() + 0.3) * 1000,
                        src = $('#pictureContent img').attr('src');

                    arr[num]['imgs'].push(src);
                    resolve();
                });
            }, timeout);
        });
    }
    function far(num) {
        arr[num]['imgs'] = [];
        console.log(`正在下载${arr[num]['title']}`);
        return new Promise((resolve,reject)=>{
            co(function* (){
                for(let i = 1; i < arr[num]['page'] + 1; i++) {
                    yield son(num, i);
                }
            }).then(function(){
                var sMysql = new SMysql(db,'manhua');
                sMysql.insert('haizeiwang',{'title': `'${arr[num]['title']}'`,'imgs': `'${JSON.stringify(arr[num]['imgs'])}'`}).end(function(data) {
                    resolve();
                });
            });
        });
    }
    return new Promise((resolve, reject)=>{
        co(function* (){
            for(let i = 45; i < arr.length; i++) {
                yield far(i);
            }
        }).then(function(){
            resolve();
        })
    })
}
function* steps() {
    yield step1();   //  各个url
    yield step2();   //  各个页码
    yield step3();   //  各个图片
}
co(steps).then(function(){
    console.log('over');
});