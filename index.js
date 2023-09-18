const Koa = require('koa');
const proxy = require('koa-proxy');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
/**
 * 代理网站
 */
router.all('/:path(.*)', async (ctx, next) => {
  if (ctx.path === '/routes-that-need-to-be-customized') {
    ctx.body = 'This is an example.'
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-forwarded-host, authorization, Set-Cookie, x-forwarded-host')
    next()
  } else {
    await proxy({
      host: 'http://example.com',
      jar: true,
      map: path => path,
    })(ctx, next)
  }
  
});

app.use(router.routes());

app.listen(3005);
console.log('Server running at http://localhost:3005/');