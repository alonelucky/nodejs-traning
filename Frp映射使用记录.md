# frp网络映射记录

下载 [` frp `](https://github.com/fatedier/frp/) 对应版本

文件结构

```
frpc.exe      # 客户端二进制文件
frpc.ini      # 客户端配置文件
frpc.full.ini # 客户端配置完整文件
fprs.exe      # 服务端二进制文件
frps.ini      # 服务端配置文件
frps.full.ini # 服务端完整配置文件    
LICENSE       # 开源协议证书
```


## 1. web项目映射

` frps ` 服务端配置:
```
[common]
# 绑定ip
bind_addr = 192.168.1.114
# 绑定端口
bind_port = 9898
# http设置需要的虚拟主机端口(访问时输入的端口,必须与监听端口不同)
vhost_http_port = 8080

```
` frpc ` 服务端配置:
```
[common]
# 链接服务端的地址
server_addr = 192.168.1.114
# 链接服务端的端口
server_post = 9898

# http配置
[http]
# 类型是http
type = http
# 域名(可以写为ip,访问时输入的ip)
custom_domains = 127.0.0.1
# 需要映射的本地端口
local_port = 80

```


