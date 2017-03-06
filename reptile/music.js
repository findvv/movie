'use strict';
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var num = 60100;
// var over = 389860;
var over = 62000
var arr = [];
var titles = [];
var file1 = fs.open("message.txt", 'w');
file1.write('');
file1.close();
var file2 = fs.open("result.txt", 'w');
file2.write('');
file2.close();
page.onResourceRequested = function(requestData, networkRequest) {
    if(requestData.url.indexOf('comments') !== -1){
        var url = requestData.url,
            data = requestData.postData;

        arr.push({
            url: url,
            data: data
        });
    }
};
function getEveryUrl(num) {
    var time = (Math.random() + 0.3) * 500;
    setTimeout(function(){
        page.open("http://music.163.com/#/song?id=" + num, function() {
            console.log(num);
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
            if (num < over) {
                getEveryUrl(num);
            } else {
                for(var i = 0; i < titles.length; i++) {
                    arr[i].title = titles[i].title;
                    arr[i].oriUrl = titles[i].url;
                }   
                var file = fs.open("message.txt", 'a');
                file.write(JSON.stringify(arr));
                file.close();
                setTimeout(function () {
                    phantom.exit()
                }, 2000);
            }
        });
    }, time);
}
getEveryUrl(num);