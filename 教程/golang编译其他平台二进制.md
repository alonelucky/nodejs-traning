# Golang交叉编译及二进制包压缩

### 1. 交叉编译

golang编译时判断平台的方法是获取当前系统的 ``` $GOOS ``` 和 ``` $GOARCH ```  变量, 执行

	go env

看到如下结果
	![](../imgs/20171104/01.png)


> #### ``` GOOS ``` 常见平台
 	1.	windows
 	2.	linux
 	3.	darwin
 	4.	freebsd
 	5.	openbsd
 	6.	plan9
 	7.	...

.

> #### ``` GOARCH ``` 常见架构
	1. amd64
	2. 386
	3. ...

首先,终端下设置GOOS为目标平台

	set GOOS=linux

执行编译
	
	go build -o package_liunx -ldflags "-w -s" package.go

就会生成对应平台的二进制文件


压缩二进制包文件大小

此处使用的 [``` upx ```](https://upx.github.io) 进行加壳压缩,下载后配置环境变量,执行

	upx package_linux

便会执行加壳压缩





	