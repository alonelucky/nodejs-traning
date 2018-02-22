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

## 5. 简单优化

conf/extra/httpd-default.conf

	Timeout 15
	# 超时设置 15秒
	KeepAlive On
	# 开启keepalive,保持活跃链接
	MaxKeepAliveRequests 50
	# 设置最大活跃链接请求数
	KeepAliveTimeout 5
	# 活跃链接超时时间 5秒

开启缓存模块

	LoadModule cache_module modules/mod_cache.so
	# 基于URI键的内容动态缓冲
	LoadModule cache_disk_module modules/mod_cache_disk.so
	# 基于磁盘的缓冲管理器
	LoadModule socache_memcache_module modules/mod_socache_memcache.so  
	# 基于内存的缓冲管理器
	LoadModule file_cache_module modules/mod_file_cache.so
	# 提供文件描述符缓存支持，从而提高Apache性能
	LoadModule filter_module modules/mod_filter.so 
	# 过滤模块，使用缓存必须启用过滤模块

配置MPM
	
	<IfModule mpm_winnt_module>
        ThreadsPerChild     150  # 每个进程子进程数
        MaxRequestsPerChild 0 # 每个子进程处理多少请求后终止,0自动处理
    </IfModule>

开启gzip+静态资源缓存

	LoadModule deflate_module modules/mod_deflate.so
	# 压缩
	LoadModule expires_module modules/mod_expires.so
	# 缓存

配置

	<IfModule mod_deflate>
		SetOutputFilter DEFLATE
		# 设置过滤模块
		DeflateCompressionLevel 4
		# 设置压缩等级 1-9 越大压缩率越高同样也越消耗CPU,一般在5左右即可
		SetEnvIfNoCase request_URI .(?:jpg|png|gif)$ no-gzip dont-vary
		# 设置不需要压缩的请求/文件(图片等二进制文件一般不压缩)
	</IfModule>

	<IfModule expires_module>
	    #打开缓存
	    ExpiresActive On 
	
	    #css文件缓存7200000/3600/24=83天
	    ExpiresByType text/css A7200000
	
	    #js文件缓存83天
	    ExpiresByType application/x-javascript A7200000
	
	    #html文件缓存83天
	    ExpiresByType text/html A7200000
	
	    #图片文件缓存83天
	    ExpiresByType image/jpeg A7200000

		# 对应后缀文件缓存 1 小时
		<FilesMatch "\.(jpg|png|gif|jprg|css|js)">
			ExpiresDefault A3600
		</FilesMatch>
	
	</IfModule>


