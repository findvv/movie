const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const view = require('koa-view');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
const tieba = require('./routes/tieba');
const feizan = require('./routes/feizan');
const music = require('./routes/music');
const admin = require('./routes/admin');
// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(view(__dirname + '/views', {
  ext: 'tpl'
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/tieba', tieba.routes(), tieba.allowedMethods());
router.use('/feizan', feizan.routes(), feizan.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/music', music.routes(), music.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;