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
const weather = require('./routes/weather');
const tieba = require('./routes/tieba');
const feiji = require('./routes/feiji');
const users = require('./routes/users');
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
router.use('/weather', weather.routes(), index.allowedMethods());
router.use('/tieba', tieba.routes(), index.allowedMethods());
router.use('/feiji', feiji.routes(), users.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;