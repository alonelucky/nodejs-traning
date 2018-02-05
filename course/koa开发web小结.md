## koa开发web小结

#### 1. 依赖选择

| 	包名		 |	 直接依赖项 |	 总依赖 |	 用途		 |
| ---: | :---: | :---: | --- |
| [koa](https://www.npmjs.com/package/koa) |  24 | 36 | 主程序 |
|[koa-router](https://www.npmjs.com/package/koa-router)| 5 | 12 |路由处理|
|[koa-body](https://www.npmjs.com/package/koa-body)| 2 | 17 | post请求处理 ``` 含文件上传formidable ``` |
|[koa-session2](https://www.npmjs.com/package/koa-session2)| 0 | 0 |会话持久|
|[koa-static](https://www.npmjs.com/package/koa-static)| 2 | 17 |静态资源处理 ``` 开发阶段使用 ``` |
|[redis](https://www.npmjs.com/package/redis)| 3 | 3 |缓存设置|
|[sequelize](https://www.npmjs.com/package/sequelize) + [mysql2](https://www.npmjs.com/package/mysql2)| 17 | 24 |数据库操作ORM ``` 包统计不含mysql2``` |
|[mongoose](https://www.npmjs.com/package/mongoose)| 12 | 30 |mongodb操作ORM|
|[nodemailer](https://www.npmjs.com/package/nodemailer)| 0 | 0 |邮件发送|
|[socket.io](https://www.npmjs.com/package/socket.io)| 5 | 38 |socket协议,即时消息处理|
|[art-template + koa-art-template](http://aui.github.io/art-template/)| 9 / 1 | 32 | 高速解析模板引擎 |

#### 2. 目录结构

>![](../imgs/20171103/01.png)


#### 3. JMeter 压力测试

#### 4. 

