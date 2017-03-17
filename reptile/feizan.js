'use strict';
var charset = require('superagent-charset');
var request = require('superagent');
var superagent = charset(request);
var cheerio = require('cheerio');
var co = require('co');
var fs = require('fs');
var SMysql = require('sm-mysql');
var arr = [];
var db = require('../db2.js');
var startNum = 2;
var canP = true;

function getEveryData() {
    return new Promise((resolve, reject)=>{
        console.log(startNum);
        var timeout = (Math.random() + 0.3) * 500;
        setTimeout(()=>{
            let url = `http://www.feizan.com/space-${startNum}.html`;
            superagent
                .get(url)
                .charset('gbk')
                .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
                .set("Cookie",'uchome_sendmail=1; bdshare_firstime=1489632008224; uchome_seccode=8a61mjUlcSV90BNMnhZDp2HmlraNgqQ72aK75lbZrr%2Br; uchome_auth=067aWMMw4yFGPpqiaiXs7IE9uPMJCivjokSFG8lOVbnGp64WmQWbK%2ByhZ6q4esCgwZTthy%2B5JB0Y6Lsix37bRBGxkfnm; uchome_loginuser=zzxzzx2015; uchome_space_top_viewnum=642705; uchome_checkpm=1; uchome_viewuids=1625_1_2_9999_99999_199999; Hm_lvt_d45a36a54df2656172f44ac65d8a49d2=1489632008; Hm_lpvt_d45a36a54df2656172f44ac65d8a49d2=1489632270')
                .end((err,res)=>{
                    var $ = cheerio.load(res.text);
                    startNum += 1;
                    if ($('.showmessage').length > 0 || $('.l_status').length > 0) {
                        resolve();
                    } else if (startNum > 600000){
                        canP = false;
                        resolve();
                    } else {
                        var sMysql = new SMysql(db,'laoma');
                        var text = $('.note_list li').eq(0).text().match(/\d+/g);
                        sMysql
                            .insert('feizan',[
                                    {
                                        'name':$('#spaceindex_name a').text(),
                                        'fangwen':text ? text[0] : 0,
                                        'guanzhu':text ? text[1] : 0,
                                        'fensi':text ? text[2] : 0,
                                        'jifen':text ? text[3] : 0,
                                        'face':$('#space_avatar img').attr('src'),
                                        'url':url
                                    }
                                ])
                            .end(function(data){
                                resolve();
                            });
                    }
                });
        }, timeout);
    })
}
function* getData() {
    while(canP) {
        yield getEveryData();
    }
}
co(getData);