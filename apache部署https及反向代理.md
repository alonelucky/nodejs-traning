# Apache 部署ssl及反向代理

## 1. 部署普通站点

	Listen 80
	<VirtualHost *:80>
	    ### localone
	    ServerName localone.com
	    DocumentRoot "D:\websites\m.glfekq\html"
	    ErrorLog "D:/Visual-AMP-x64/logs/Apache/localone.logs"
	    <Directory "D:\websites\m.glfekq\html">
	        Options Indexes FollowSymLinks Includes ExecCGI
	        AllowOverride all
	        Require all granted
	    </Directory>
	</VirtualHost>


.

	Listen 监听端口
	<VirtualHost 绑定IP:绑定端口>
	    ServerName 域名
	    DocumentRoot 站点根目录
	    ErrorLog 错误日志存放
	    <Directory 站点根目录配置>
	        Options Indexes FollowSymLinks Includes ExecCGI
			# 自动索引(目录浏览功能)
	        AllowOverride all
	        Require all granted
			# 访问权限
	    </Directory>
	</VirtualHost>

## 2. 部署普通站点ssl

确认开启openssl模块

	LoadModule ssl_module modules/mod_ssl.so

开启SSL

	SSLEngine on
	# 开启SSL
	SSLCertificateFile
	# 证书路径
	SSlCertificateKeyFile
	# key证书路径

开启80转443

	<Directory 根路径>
		RewriteEngine on
		# 开启url重写
		RewriteCond %{SERVER_POST} !^443$
		RewriteRule ^(.*)?$ https://%{SERVER_NAME}/$1 [L,R]
	</Directrory>
	
## 3. 部署反向代理站点

确认开启proxy相关模块

	LoadModule proxy_module modules/mod_proxy.so
	LoadModule proxy_http_module modules/mod_proxy_http.so

开启后基本可以满足大多场景,如下配置即可使用

	ProxyPass /wap http://127.0.0.1:3000/
	# 反向代理本地3000端口
	ProxyPass / http://www.baidu.com/
	# 反向代理指定站点
	ProxyPassReverse / http://127.0.0.1:3000/
	# 转发实际请求头
	ProxyPass /img !
	# 不转发 /img 开头的url
	ProxyPassMatch (.*)(\.png|\.css)$ !
	# 不转发以.png|.css的url

如果使用ProxyPass则必须要在 http://127.0.0.1:3000/ 最后带上 ``` / ``` 否则只能访问一个页面,其余页面均为

	Reason: DNS lookup failure for *******
	
## 4. 部署反向代理站点ssl

基本同 ___2 部署普通站点ssl ___