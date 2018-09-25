# Nodejs判断邮箱是否有效

使用模块 ` dns ` 原理：根据dns解析判断是否有有效邮箱解析,Nodejs 自带dns模块

函数如下
```
dns.resolve('domain.com','MX',(err, data) => {
    // 不存在则返回错误信息
    console.log(err);
    // 存在则返回dns记录
    console.log(data);
})
```
或者函数
```
dns.resolveMx('domain.com',(err, data) => {
    // 不存在则返回错误信息
    console.log(err);
    // 存在则返回dns记录
    console.log(data);
})
```
