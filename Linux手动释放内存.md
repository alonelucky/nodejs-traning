#Linux手动释放内存

正常情况linux 下是不需要手动内存释放的,但是使用图形界面的时候部分程序的确占用较大内存，但又需要释放的时候就需要用到手动释放了．

### 1. 查看内存
```
cat /proc/sys/vm/drop_caches
# 0
# 0 – 不释放
# 1 – 释放页缓存
# 2 – 释放dentries和inodes
# 3 – 释放所有缓存

sync
# sync 命令运行 sync 子例程。如果必须停止系统，则运行 sync 命令以确保文件系统的完整性。

free -m 
#              total        used        free      shared  buff/cache   available
# Mem:           7929        5876         502         128        1549        1649
# Swap:             0           0           0
# total——总物理内存
# used——已使用内存，一般情况这个值会比较大，因为这个值包括了cache+应用程序使用的内存
# free——完全未被使用的内存
# shared——应用程序共享内存
# buffers——缓存，主要用于目录方面,inode值等（ls大目录可看到这个值增加）
# cached——缓存，用于已打开的文件
```

### 2. 释放内存
```
echo 1 > /proc/sys/vm/drop_caches
# 
#              total        used        free      shared  buff/cache   available
# Mem:           7929        5902        1375         129         650        1628
# Swap:             0           0           0
```
内存已经释放掉了
