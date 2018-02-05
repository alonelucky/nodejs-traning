# letsencrypt部署https

### 1. Windows Server

###### 1. 下载安装 [letsencrypt-win-simple](https://github.com/Lone-Coder/letsencrypt-win-simple/releases)
###### 2. 解压到指定目录

	./letsencrypt.exe

###### 3. 按照提示输入邮箱用于接收证书到期通知
###### 4. 同意条款

![](../imgs/20171213/01.png)

然后就可以按照菜单选择创建或取消证书

	N: 创建一个新证书
	L: 已经存在的定时任务列表
	R: 重新开始定时任务
	A: 重新开始所有定时任务
	C: 取消定时任务,并重建
	X: 取消所有定时任务
	Q: 退出菜单

###### 5. 选择 ```N``` 创建新证书

![](../imgs/20171213/02.png)

图片简译:

	请从菜单中选择: n
		1. 单一的IIS站点
		2. IIS所有站点绑定证书
		3. 多个IIS站点绑定证书
		4. 手动输入主机名(域名)
			
	你想为哪一个子项创建证书: 4
	
	输入主机名(域名)列表,默认一个
	
		1. [dns-01] 微软DNS
		2. [dns-01]运行外部脚本来创建和更新
		3. 保存到本地(本机需要是网络主机)
		4. ftp上传验证文件
		5. 自有主机验证(80端口在验证期间,不可用)
		6. 上传验证文件到webdev

	选择你喜欢的验证方式 : 3
	
	验证前复制默认web.config文件:n

	输入本地网络站点根目录(用于http验证):D:\path

验证通过则会创建定时任务

> 下边是部署:

找到letsencrypt创建的证书文件夹

	C:\ProgramData\letsencrypt-win-simple\httpsacme-v01.api.letsencrypt.org

其中主要的证书文件有:
	
	*-chain.pem
	*-crt.der
	*-crt.pem
	*-csr.pem
	*-key.pem

nginx服务器使用的是
	
	ssl_certificate  ----- >    *-chain.pem
	ssl_certificate_key  -----> *-key.pem

其余的暂时未接触	
	

### 2. Linux Server

linux使用的是certbot工具部署

###### 1. 前几步按照[官方说明](https://certbot.eff.org/#ubuntutrusty-nginx)操作
	
	$ sudo apt-get update 
	$ sudo apt-get install nginx
	$ sudo apt-get install software-properties-common
	$ sudo add-apt-repository ppa:certbot/certbot
	$ sudo apt-get update
	$ sudo apt-get install python-certbot-nginx

###### 2. 创建证书

	certbot --nginx

如果nginx中已经部署有域名,会提示让选择给哪一个创建证书,可以多选(数字序号)

选择后会自动创建验证文件并验证


### 3. Docker 部署(暂无官方certbot)

	使用的certbot工具部署

基本都属于个人创建的nginx/apache+certbot的docker镜像,按需选择即可

	docker pull xxx/certbot
	docker run -d -p 80:80 -p 443:443 xxx/certbot

就可以使用了



