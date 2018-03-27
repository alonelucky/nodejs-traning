# Verdaccio 搭建npm私有仓库

由于sinopia项目不再维护,故选取分支项目verdaccio进行搭建,使用方法一样,仅仅将sinopia换为verdaccio

环境依赖

	python 2.7.x
	node-gyp

### 1. 安装verdaccio

```
npm i -g verdaccio
```

配置文件 ~/.config/verdaccio/config.yaml

	# 存放位置
	storage: ./npmdata
	
	# 认证
	auth:
		htpasswd:
			file:./authpasswd
			max_users:10

	# 抓取镜像源
	uplinks
		npmjs:
			url:http://registry.npm.taobao.org/

	# package
	packages:
		"@*/*":
			access:$all
			publish:$authenticated
		"*":
			access:$all
			publish:$authenticated

	# 日志
	logs:
		- {type:stdout,format:pretty,level:http,path:./npm.log}
	
	# 监听端口(默认没有这个选项监听4873端口)
	listen:	0.0.0.0:4433

### 2. 启动项目

1. 默认启动
```
verdaccio
# 默认加载 ~/.config/verdaccio/config.yaml
# 默认监听
# 默认存储位置 ~/.config/verdaccio/storage/
# 默认账号密码存放位置 ~/.config/verdaccio/htpasswd
```
2. 终端命令启动

```
verdaccio -l 端口 -c 配置文件位置
```

3. pm2进程守护
```
pm2 start `which verdaccio` --name "local_npm"
```

### 3. 项目使用

1. 修改源
```
npm set registry http://0.0.0.0:4433
```

2. 增加用户
```
npm adduser --registry http://0.0.0.0:4433
Username:
Passwd:
Emial:
```
3. 发布包
和发布到npm仓库一样,登录,发布
```
npm login
npm publish
```
4. 安装包
```
npm install @xxx/yyy
```

### 4. 注

使用 ` nrm ` 管理源 
使用 nrm 增加源
```
nrm add nl http://0.0.0.0:4433
```
使用 nrm 切换源
```
nrm use nl
```
浏览 nrm 源
```
nrm ls
```



