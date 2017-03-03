'use strict';
var co = require('co');
var superagent = require('superagent');
var cheerio = require('cheerio');
var db = require('../db.js');
var SMysql = require('sm-mysql');
var getSortFun = SMysql.sort;
var url = 'https://tieba.baidu.com/p/3132629396?see_lz=1&pn=1';
var lock = false;
var arr = [];
var num = 0;
var trim = function(str){
    var trimLeft = /^\s+/,
        trimRight = /\s+$/,
        newStr = str.replace( trimLeft, "" ).replace( trimRight, "" ).replace(/[\r\n]/g,"");
    return newStr;
}
// 1.1 创建贴吧数据库
var step11 = (() => {
    return new Promise((resolve,reject) => {
        (new SMysql(db,'tieba'))
            .createTable(keyWord,{
                'num' : {
                    type: 'INT',
                    length: 10,
                    isNull: false
                },
                'title' : {
                    type: 'VARCHAR',
                    length: 50,
                    isNull: false
                },
                'url' : {
                    type: 'VARCHAR',
                    length: 50,
                    isNull: false
                }
            })
            .end(function(data) {
                resolve();
            });
    });
});

function to() {
    var time = (Math.random() + 0.3) * 1000;
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            superagent
                .get(`http://tieba.baidu.com/f?kw=%E6%9D%8E%E6%AF%85&ie=utf-8&pn=${num}`)
                .set("Cookie",'TIEBA_USERTYPE=e1100a0dab23683912b25537; bdshare_firstime=1483696532166; BAIDUID=E3BC09AA9C79F0440C4B3A9A53290A9B:FG=1; PSTM=1487065321; BIDUPSID=EFD474BAF1B15083C011AEF52331535D; BAIDUCUID=++; IS_NEW_USER=6a1d9b62231ce359ce22e374; TIEBAUID=c57bab2ca9e9741802f2cbff; BDUSS=9YQTI5ZXFtVGUtWk5LNU1GN2NYb0dLMTlvandUM1hSLUpvM0hVQ041bVYzOXhZSUFBQUFBJCQAAAAAAAAAAAEAAACB4vMm0KHN5tTasbG-qQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJVStViVUrVYSk; H_WISE_SIDS=106303_100183_114144_113884_114746_107851_114699_114702_114001_107918_112106_107315_112134_114125_114098_114843_114798_114513_114329_114535_114313_114275_114717_114076_110085_114571; BDSFRCVID=uLKsJeC62GmPPeRiRADOwNx2oW6MhI7TH6aonq1azoh6L6k4opnoEG0PJf8g0Ku-dWitogKK0mOTHUvP; H_BDCLCKID_SF=fRKJoD_MtKvDj6rl-DTMbt00qxbXqM53W67Z0l8KttnWMJ3N04rCylDQ5PTOJt4HW23m_MjmWIQHDI5-b6r-b6jXWqOaXf53WKn4KKJx5tPWeIJo5DcfLfrDhUJiB5OLBan7-4QxfD0WMDLmD5L35bD_-UR-bD6LK6r0WtOEHJOoDDklD5O5y4LdjG5N-RTT3bv0bqc42-3FJKovDR--LfIw3-Aq54RT5GAOLIoNtt5JMx3RBUA-QfbQ0-6PqP-jW5IL24ogfR7JOpkxhfnxyhLB0aCDJ5kDtRueVbOsa-5fKRopMtOhq4tehHRrqUneWDTm_D_KMUQ18RrY0x6C2R-N2a5yJJtq0mQN-pPKKR7vhx7IM-60bnFO2MjjKKrz3mkjbPjzfn02OPKz0TKWQ44syP4j2xRnWNTqbIF-tKDKhItGjjRjq6oBDprt2D62aKDsWPTc-hcqEIL4hhQs5bLwMJ5Z2TvfBj-HWKobJqjkVxbSj4QoMTkjjPjQtMntyH7ZafTL2p5nhMJlXj7JDMP0-xQg5f3y523ion6vQpnlfxtuDjAhDTjBDG8s-bbfHj60WJ3Jan7he5rnhPF3hT83KP6-35KHaTFOXqr82xoNExn6XRAKhTDUDGblth37JD6yKJoz0DnYJbbaDRbkQtoQyPoxJpODBRbMopvaKJ7ZOt3vbURvD-ug3-7P-q8EJbADoDD-JCvbfP0kKtr_MJQH-UnLqMjX257Z0l8KtD0KqC_Gh4rCLDu35PTOJtRitjcW-b7mWIQHDPjaLPo-5noyja0eBlTH2mn4KKJx5fKWeIJo5DcvMq5XhUJiB5OLBan7-4QxfDIWhKK6DTu3K-FbbfkXKR5--DTeLPbHKbP_DR5menodyntpbt-qJfbLLNR-bJT40lbcfpr9D4nRjxuJyHJnBT5KaKoDoRjLabP-8KQcj-n2h44kQN3TBtKO5bRiL66eQbTMDn3oyT3VXp0n3qjTqtJHKbDD_D-XfxK; STOKEN=3b82f42acf51f9984d27aa8c70a29973f1a2b067d1ddfb230753ff29854df109; wise_device=0; MCITY=-131%3A; locale=zh; bottleBubble=1; PSINO=2; H_PS_PSSID=22084_1455_21111_17001_21263_22035_20719')
                .end((err,res)=>{
                    var $ = cheerio.load(res.text);
                    if ((num / 50 > 1000) || $('.j_thread_list').length == 0) {
                        lock = true;
                    } else {
                        console.log(num / 50);
                        $('.j_thread_list').each(function(){
                            var $this = $(this);
                            var title = $(this).text();
                            arr.push({
                                'num': Number($this.find('.threadlist_rep_num').text()),
                                'title': trim($this.find('.j_th_tit').text()),
                                'url': `https://tieba.baidu.com${$this.find('a.j_th_tit').attr('href')}`
                            });
                        });
                        num += 50;
                    }             
                    resolve();       
                });
        }, time)
    });
}


function* go(){
    while (!lock) {
        yield to();
    }
}

var step12 = (() => {
    return new Promise((resolve, reject)=>{
        co(go).then(()=>{
            arr = arr.sort(getSortFun('desc', 'num'));
            resolve(arr);
        });
    });
});

// 1.3 贴吧数据写入数据库
var step13 = ((data) => {
    return new Promise((resolve,reject) => {
        (new SMysql(db,'tieba'))
            .deleteData(keyWord)
            .insert(keyWord, data)
            .end(function(data) {
                resolve();
            });
    });
});

// 1.获取贴吧数据并且写入数据库
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