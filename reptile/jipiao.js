'use strict';
var co = require('co');
var cheerio = require('cheerio');
var superagent = require('superagent');
var schedule = require('node-schedule');
var fs = require('fs');
var SMysql = require('sm-mysql');
var db = require('../db2.js');
var getSortFun = SMysql.sort;
var arr = [];
var begin = '2017-04-01';
var end = '2017-04-04'
var oriUrl = 'https://touch.qunar.com/h5/flight/';
var cityList = ["上海","成都","昆明","西安","重庆","深圳","杭州","海口","乌鲁木齐","广州","厦门","哈尔滨","南京","三亚","长沙","贵阳","武汉","郑州","南宁","青岛","天津","大连","沈阳","济南","福州","兰州","太原","温州","长春","阿里","阿尔山","安庆","阿勒泰","安康","鞍山","安顺","阿克苏","阿拉善左旗","阿拉善右旗","包头","北海","北京","百色","保山","博乐","毕节","巴彦淖尔","长治","池州","长春","常州","昌都","朝阳","常德","长白山","成都","重庆","长沙","赤峰","大同","大连","东营","大庆","丹东","大理","敦煌","达州","稻城","恩施","鄂尔多斯","二连浩特","额济纳旗","佛山","福州","阜阳","抚远","贵阳","桂林","广州","广元","格尔木","赣州","固原","哈密","呼和浩特","黑河","海拉尔","哈尔滨","海口","黄山","杭州","邯郸","合肥","黄龙","汉中","和田","淮安","鸡西","晋江","锦州","景德镇","嘉峪关","井冈山","济宁","九江","佳木斯","济南","加格达奇","金昌","揭阳","喀什","昆明","康定","克拉玛依","库尔勒","库车","喀纳斯","凯里","兰州","洛阳","丽江","荔波","林芝","柳州","泸州","连云港","黎平","连城","拉萨","临沧","临沂","吕梁","芒市","牡丹江","满洲里","绵阳","梅县","漠河","南京","南充","南宁","南阳","南通","南昌","那拉提","宁波","攀枝花","普洱","衢州","黔江","秦皇岛","庆阳","且末","齐齐哈尔","青岛","日喀则","深圳","石家庄","三亚","沈阳","上海","神农架","唐山","铜仁","塔城","腾冲","台州","天水","天津","通辽","吐鲁番","太原","泰州","威海","武汉","梧州","文山","无锡","潍坊","武夷山","乌兰浩特","温州","乌鲁木齐","万州","乌海","兴义","西昌","厦门","香格里拉","西安","西宁","襄阳(中国)","锡林浩特","西双版纳","徐州","义乌","永州","榆林","扬州","延安","运城","烟台","银川","宜昌","宜宾","宜春","盐城","延吉","玉树","伊宁","伊春","珠海","昭通","张家界","舟山","郑州","中卫","芷江","湛江","遵义","张掖","张家口","香港","曼谷","首尔","东京","普吉","新加坡","台北","清迈","吉隆坡","悉尼","澳门","大阪","伦敦","洛杉矶","纽约","马尼拉","墨尔本","温哥华","巴黎","槟城","多伦多","胡志明市","旧金山","金边","雅加达","济州岛","高雄","釜山","暹粒","法兰克福","中国","韩国","泰国","美国","加拿大","日本","澳大利亚","英国","法国","马来西亚","东南亚","港澳台","日韩","欧洲"];
function getCity(city,num) {
    return new Promise(function(resolve,reject) {
        var time = (Math.random() + 0.3) * 500,
            param = `?startCity=${encodeURI('北京')}&destCity=${encodeURI(city)}&startDate=${begin}&backDate=${end}&flightType=roundWay&filter=&filterValue=&vt=&wrapperid=&isMix=-1&from=&sort=5`,
            url = `${oriUrl}flightlist${param}`;

        setTimeout(function(){
            superagent
            .get(url)
            .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
            .end(function(err,res){
                console.log(res.text);
                var $ = cheerio.load(res.text);
                if ($('.list-row').length == 0) {
                    resolve();
                } else {
                    console.log(num + '/' + cityList.length);
                    $('.list-row').each(function(){
                        if ($(this).index() < 5) {
                            var $this = $(this),
                                price = parseInt($(this).find('.price').text()),
                                goQuery = $(this).find('.roundWayList-info').eq(0),
                                backQuery = $(this).find('.roundWayList-info').eq(1),
                                gotime = `${goQuery.find('.from-time').text()}-${goQuery.find('.to-time').text()}`,
                                backtime = `${backQuery.find('.from-time').text()}-${goQuery.find('.to-time').text()}`,
                                code = $(this).data('code'),
                                detailUrl = `${oriUrl}flightDetail${param}&code=${code}`;

                            arr.push({
                                'price': price,
                                'city': city,
                                'gotime': gotime,
                                'backtime': backtime,
                                'url': detailUrl
                            });
                        }
                    });
                    resolve();
                }
            });
        },time);
    });
}
function* get(){
    for(var i = 0; i < cityList.length; i++) {
        yield getCity(cityList[i],i);
    }
}
var rule = new schedule.RecurrenceRule();  
rule.minute = [0,10,20,30,40,50];  
// schedule.scheduleJob(rule, function(){
    arr = [];
    var t = new Date();
    co(get).then(function(){
        arr = arr.sort(getSortFun('asc', 'price'));
        (new SMysql(db,'feiji')).deleteData('jipiao').insert('jipiao',arr).end(function(data){
            console.log(t);
        })
    });
// });