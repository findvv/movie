'use strict';
var superagent = require('superagent'),
    schedule = require('node-schedule'),
    SMysql = require('sm-mysql'),
    db = require('../db.js'),
    sMysql = new SMysql(db,'weather'),
    co = require('co'),
    appKey = '22782',
    sign = 'b33e6e038ff1d39d3adf6ffb2d710840',
    cities = ['1','94'],
    aqis = [];

function getAqi(url) {
    return new Promise(function(resolve, reject){
            superagent.get(url).end(function (err, sres) {
                var result = JSON.parse(sres.text),
                    aqi = parseInt(result.result.aqi);

                resolve(aqi);
            });
        });
}
function *getAqis(){
  for(let city of cities){
    var url = 'http://api.k780.com:88/?app=weather.pm25&weaid=' + city + '&appkey=' + appKey + '&sign=' + sign + '&format=json',
        aqi = yield getAqi(url);

    aqis.push(aqi);
  }
}
schedule.scheduleJob('0 0 9 * * *', function(){
co(getAqis).then(function(){    
      var date = new Date(),
          time = (date.getMonth() + 1) + '.' + (date.getDate());
          
      sMysql.insert('aqi',{'time':time,'beijing':aqis[0],'hangzhou':aqis[1]}).end(function(data){
        console.log(data[0])
      })
      aqis = [];
  });
});
