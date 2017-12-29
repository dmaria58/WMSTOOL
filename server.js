/*const webpack = require('webpack');
const Koa = require('koa');
const path=require('path');
const serve = require('koa-static');
const app = new Koa();
//app.use(serve(path.join(__dirname, '..', '_site')))
app.use(serve(__dirname + '/_site'));
app.listen(2000, function() {
	console.log('正常打开2000端口')
});*/
const Koa = require('koa');
const app = new Koa();
const  serve = require("koa-static");
app.use(serve(__dirname+ "/_site",{ extensions: ['html']}));
	/*var Router = require('koa-router');
	var myRouter = new Router();
	myRouter.get('/index-cn/', function *(next) {
 	 yield this.render('/_site/index.html',{layout:false});
	});
	app.use(myRouter.routes());*/
app.listen(2000);