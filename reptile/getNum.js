var webPage = require('webpage');
var page = webPage.create();
var num = 0;
var fs = require('fs');
var comments = [];
var data = JSON.parse(fs.read('message.txt'));
console.log(data.length);
function getEveryUrl(num) {
    var time = (Math.random() + 0.3) * 500;
    setTimeout(function(){
        page.open(data[num].url,"POST",data[num].data, function() {
            
            var total = page.evaluate(function() {
                return JSON.parse(document.body.innerHTML).total;
            });
            comments.push({
                total: total,
                title: data[num].title,
                url: data[num].oriUrl
            });
            console.log(num);
            num += 1;
            if (num < data.length) {
                getEveryUrl(num);
            } else {
                var file = fs.open("result.txt", 'a');
                file.write(JSON.stringify(comments));
                file.close();
                setTimeout(function () {
                    phantom.exit()
                }, 2000);
                phantom.exit();
            }
        });
    }, time);
}
getEveryUrl(num);