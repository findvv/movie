var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'zzx'
  };
  await ctx.render('index', {
    title: 'test'
  });
})
module.exports = router;
