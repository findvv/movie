'use strict';
var co = require('co');
var superagent = require('superagent');
var cheerio = require('cheerio');
var db = require('../db.js');
var SMysql = require('sm-mysql');
var getSortFun = SMysql.sort;

// 1.1 创建豆瓣数据库
var step11 = (() => {
    return new Promise((resolve,reject) => {
        (new SMysql(db,'movie'))
            .createTable('douban',{
                'id' : {
                    type: 'VARCHAR',
                    length: 10,
                    isNull: false
                },
                'title' : {
                    type: 'VARCHAR',
                    length: 30,
                    isNull: false
                },
                'rate' : {
                    type: 'VARCHAR',
                    length: 10,
                    isNull: false
                },
                'img' : {
                    type: 'VARCHAR',
                    length: 100,
                    isNull: false
                }
            })
            .end(function(data) {
                resolve();
            });
    });
});
// 1.2 爬虫获取豆瓣数据
var step12 = (() => {
    return new Promise((resolve, reject) => {
        superagent
            .get('https://movie.douban.com/nowplaying/beijing/')
            .end((err, res)=>{
                var $ = cheerio.load(res.text),
                    result = [];

                $('.lists').eq(0).find('>li').each(function(){
                    var $this = $(this);
                
                    $this.attr('id') && result.push({
                        'id': $this.attr('id'),
                        'title': $this.data('title'),
                        'rate': $this.data('score'),
                        'img': $this.find('.poster img').attr('src')
                    });
                });
                result = result.sort(getSortFun('desc', 'rate'));
                resolve(result);
            });
    });
});
// 1.3 豆瓣数据写入数据库
var step13 = ((data) => {
    return new Promise((resolve,reject) => {
        (new SMysql(db,'movie'))
            .deleteData('douban')
            .insert('douban', data)
            .end(function(data) {
                resolve();
            });
    });
});
// 1.获取豆瓣数据并且写入数据库
var step1 = (() => {
    return new Promise((resolve,reject) => {
        co(function*(){
            yield step11();
            var data = yield step12();
            yield step13(data);
        }).then(()=>{
            resolve();
        });
    });
});

co(function*(){
    yield step1();
}).then(()=>{
    console.log('over');
})