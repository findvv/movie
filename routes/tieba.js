var router = require('koa-router')(),
    SMysql = require('sm-mysql'),
    db = require('../db2.js');

function newPromise(){
    return new Promise(function(resolve, reject){
        var sMysql = new SMysql(db,'tieba');
        sMysql.order('李毅','*','num','DESC','0,50').end(function(data){
            resolve(data[0]);
        });
    });
}
router.get('/api', async function (ctx, next) {
  var data = await newPromise();
  ctx.body = {
    data: data
  };
})
router.get('/', async function (ctx, next) {
  var data = await newPromise();
  await ctx.render('tieba',{
    data: data
  });
})
module.exports = router;
