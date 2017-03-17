var router = require('koa-router')(),
    SMysql = require('sm-mysql'),
    db = require('../db2.js');

function newPromise(){
    return new Promise(function(resolve, reject){
        var sMysql = new SMysql(db,'music');
        sMysql.search('wangyi',{
          query: '*',                     // 搜索关键词
          orderBy:'total',    // 排序条件
          sort: 'DESC',
          limit: '0,500'
        }).end(function(data){
            resolve(data[0]);
        });
    });
}
router.get('/', async function (ctx, next) {
  var data = await newPromise();
  await ctx.render('music',{
    data: data
  });
});
module.exports = router;
