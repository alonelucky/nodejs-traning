# 如何解决egg在win下部署问题


	eggjs 是阿里推出的企业级nodejs开发框架,好用之余, 对于win平台的部署就不是很友好了.

	官方文档中,对egg的官方部署方法egg-script说明,,不支持window系统,因为win下多开nodejs集群容易造成多个nodejs终端前台挂起, 无法正常使用.

	故,因为egg是基于koa的框架,因此在egg中找到原生的koa程序,使用koa监听程序即可在win下进行单进程部署.


##### 1.直接上代码

egg 入口源码中

	exports.Application = require('./lib/application');

而后者,即是处理过的koa App,监听端口的listen也在这里,但是向外暴露的这个koa是处理过的,
因此监听端口代码如下:

	// {app_root_dir}/server.js
	const Application = require('egg').Application

	const app = new Application({
	  baseDir: __dirname
	})
	
	app.ready(() => app.listen(3000))

这样就可以使用 ``` node server.js ``` / ``` forever start server.js ``` / ``` pm2 start server.js ```
