## 为golang编译创建图标



#### 1. 准备图标

	准备ico格式的图标
	your_program.ico

#### 2. 创建ico.rc文件

	IDI_ICON1 ICON "your_program.ico"

#### 3. 安装windres.exe(MinGW中带有)

	编译rc文件
	windres -o your_program.syso ico.rc
	# 生成.syso文件

#### 4. 编译golang程序

	 go build

#### 5. 得到带图标的二进制文件



#### 6. 文件目录

	+--项目
	|	your_program.ico
	|	ico.rc
	|	your_program.syso
	|	hello.go

文件名均可行设置
	