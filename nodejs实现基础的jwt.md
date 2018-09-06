## nodejs实现基础的jwt

```
使用模块,nodejs原生模块
Crypto
```
#### 1. 实现机制
JSON Web Token 由三部分组成，头部（Header）、载荷（Payload）与签名（Signature），并由 `.` 英文点拼接。
1. Header
生成jwt头部,声明其类型以及签名所用的算法等的JSON格式,并将其进行base64转码
```
let jwtHeader = {
    typ:'JWT',
    alg:'SHA256'
}

jwtHeader = Buffer.from(JSON.stringify(jwtHeader)).toString('base64');
// base64
```
2. Payload
生成jwt载荷部分,并将其进行base64转码
- iss: 该JWT的签发者，是否使用是可选的；
- sub: 该JWT所面向的用户，是否使用是可选的；
- aud: 接收该JWT的一方，是否使用是可选的；
- exp(expires): 什么时候过期，这里是一个Unix时间戳，是否使用是可选的；
- iat(issued at): 在什么时候签发的(UNIX时间)，是否使用是可选的；
- nbf (Not Before)：如果当前时间在nbf里的时间之前，则Token不被接受；一般都会留一些余地，比如几分钟；，是否使用是可选的；

```
let jwtPayload = {
    data:{
        userId: 123456
    },
    exp: '2018-08-01',
}

jwtPayload = Buffer.from(JSON.stringify(jwtPayload)).toString('base64');
```
3. Signature
将上面的两个编码后的字符串都用句号.连接在一起（头部在前）,并使用sha256及secret对其进行签名处理
```
const crypto = require('crypto');
let jwtStr = jwtHeader + '.' + jwtPayload;
let jwtSignature = crypto.createHmac('sha256','my secret').update(jwtStr).digest('base64');
```
4. jwt
将三个部分连接即组成了完整的jwt
```
let jwtToken = jwtHeader + '.' + jwtPayload + '.' + jwtSignature;
```
#### 2. jwt解析
处理生成 ` jwt ` 是需要使用的，生成如上，解析自然也就比较简单
1. 校验签名
```
// 拆分jwt
let jwtArr = jwtToken.split('.');
// 根据头部和载荷验证签名是否匹配
let checkToken = crypto.createHmac('sha256','my secret').update(jwtArr[0]+'.'+jwtArr[1]).digest('base64');
checkToken ?= jwtArr[2]
```
2. 解析数据
```
//　校验签名通过，解析载荷的base64数据
let jwtPayload = JSON.parse(Buffer.from(jwtArr[1],'base64').toString())
```

