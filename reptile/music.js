var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var SMysql = require('sm-mysql');
var num;
var allNum = 59867;
var num2 = 0;
var thisPage;
var over = 389860;
var arr = [];
var newArr = [];
var titles = [];
var comments = [];
function getEveryUrl2() {
    var time = (Math.random() + 0.5) * 500;
    setTimeout(function(){
        if (newArr.length == 0) {
            arr = [];
            newArr = [];
            thisPage += 1;
            num2 = 0;
            comments = [];
            titles = [];
            getEveryUrl();
        } else {
            page.open(newArr[num2].url,"POST",newArr[num2].data, function() {
            
                var total = page.evaluate(function() {
                    return JSON.parse(document.body.innerHTML).total;
                });
                comments.push({
                    total: total,
                    title: newArr[num2].title,
                    url: newArr[num2].oriUrl
                });
                num2 += 1;
                if (num2 < newArr.length) {
                    getEveryUrl2();
                } else if(num < over){
                    var file = fs.open("../result/" + thisPage + ".txt", 'a');
                    file.write(JSON.stringify(comments));
                    file.close();
                    setTimeout(function () {
                        var file3 = fs.open("m.txt", 'w');
                        file3.write('{"num":' + num + ',"thisPage":' + (thisPage + 1) + '}');
                        file3.close();
                    },500)
                    setTimeout(function () {
                        arr = [];
                        newArr = [];
                        thisPage += 1;
                        num2 = 0;
                        comments = [];
                        titles = [];
                        getEveryUrl();
                    }, 1000);
                } else {
                    phantom.exit();
                }
            });
        }
    }, time);
}

function getEveryUrl() {
    var time = (Math.random() + 0.5) * 500;
    setTimeout(function(){
        page.open("http://music.163.com/#/song?id=" + num, function() {
            var title = page.evaluate(function() {
                return document.title;
            });
            if (title !== '网易云音乐') {
                titles.push({
                    title:title,
                    url:"http://music.163.com/#/song?id=" + num
                });
            }
            num += 1;
            if (num < allNum + thisPage * 20) {
                getEveryUrl();
            } else {
                for(var i = 0; i < titles.length; i++) {
                    arr[i].title = titles[i].title;
                    arr[i].oriUrl = titles[i].url;
                } 
                for(var i = 0; i < titles.length; i++) {
                    newArr[i] = arr[i]
                }
                setTimeout(function(){
                    getEveryUrl2();
                }, 200);
            }
        });
    }, time);
}
page.onResourceRequested = function(requestData, networkRequest) {
    if(requestData.url && requestData.url.indexOf('comments') !== -1){
        var url = requestData.url,
            data = requestData.postData;

        arr.push({
            url: url,
            data: data
        });
    }
};
var file2 = fs.open('m.txt','r');
var str = file2.read();
setTimeout(function(){
    str = JSON.parse(str);
    num = str.num;
    thisPage = str.thisPage;
    getEveryUrl();
    file2.close();
}, 500);
