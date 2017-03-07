var router = require('koa-router')(),
    SMysql = require('sm-mysql'),
    db = require('../db.js');

function newPromise(table){
    return new Promise(function(resolve, reject){
        var sMysql = new SMysql(db,'feiji');
        sMysql.search(table).end(function(data){
            resolve(data[0]);
        });
    });
}
router.get('/api', async function (ctx, next) {
  var data = await newPromise('qunaer');
  ctx.body = {
    data: data
  };
});
router.get('/', async function (ctx, next) {
  var data = await newPromise('qunaer');
  await ctx.render('feiji',{
    data: data,
    txt: '2017-04-02'
  });
});
router.get('/2', async function (ctx, next) {
  var data = await newPromise('qunaer2');
  await ctx.render('feiji',{
    data: data,
    txt: '2017-04-01'
  });
});
module.exports = router;
