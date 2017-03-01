var router = require('koa-router')(),
    SMysql = require('sm-mysql'),
    db = require('../db.js');

function newPromise(){
    return new Promise(function(resolve, reject){
        var sMysql = new SMysql(db);
        sMysql.search('aqi').end(function(data){
            resolve(data[0]);
        });
    });
}
router.get('/', async function (ctx, next) {
  var data = await newPromise();
  await ctx.render('weather', {
    data: JSON.stringify(data)
  });
})
module.exports = router;
