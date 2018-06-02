## docker二进制安装配置

#### 1. 下载docker-ce二进制镜像
[docker-ce binaries doc](https://docs.docker.com/install/linux/docker-ce/binaries/)
[docker-ce binaries download](https://download.docker.com/linux/static/stable/)

#### 2. 解压缩文件
目录结构：
```
/docker
	- docker
	- docker
	- docker-containerd-ctr 
	- dockerd 
	- docker-proxy
	-  docker-containerd
	- docker-containerd-shim 
	- docker-init 
	- docker-runc
```
将文件复制到 `/usr/bin/` 下
```
sudo cp docker/* /usr/bin
```

#### 3. 配置启动环境
在` /et/ststemd/system/`创建 `docker.service` 和 `docker.socket` 
下载配置文件

[docker config file](https://github.com/moby/moby/tree/master/contrib/init/systemd)

创建 `/etc/docker/daemon.json`
```json
{
	"registry-mirrors": ["https://hub-mirror.c.163.com"]
}
```
#### 4. 执行命令
```
# 重启daemon(加载docker/daemon.json)
sudo systemctl daemon-reload
# 启动docker
sudo systemctl start docker
# 开机启动
sudo systemctl enable docker
```






