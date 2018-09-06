## nodejs实现基础的jwt

```
使用模块,nodejs原生模块
Crypto
```
#### 1. 实现机制
JSON Web Token 由三部分组成，头部（Header）、载荷（Payload）与签名（Signature）。
* 1. Header *
```
let jwtHeader = {
    typ:'',
    alg:''
}

jwtHeader = Buffer.from(JSON.stringify(jwtHeader)).toString('base64');
// base64
```
* 2. Payload *
```
let jwtPayload = {
    data:{
        userId: 123456
    },
    exp: '2018-08-01',
}

jwtPayload = Buffer.from(JSON.stringify(jwtPayload)).toString('base64');
```
* 3. Signature *
```
const crypto = require('crypto');
let jwtStr = jwtHeader + '.' + jwtPayload;
let jwtSignature = crypto.createHmac('sha256','my secret').update(jwtStr).digest('base64');
```
* 4. jwt *
```
let jwtToken = jwtHeader + '.' + jwtPayload + '.' + jwtSignature;
```
#### 2. jwt解析
处理生成 ` jwt ` 是需要使用的，生成如上，解析自然也就比较简单
* 1. 校验签名 * 
```
// 拆分jwt
let jwtArr = jwtToken.split('.');
// 根据头部和载荷验证签名是否匹配
let checkToken = crypto.createHmac('sha256','my secret').update(jwtArr[0]+'.'+jwtArr[1]).digest('base64');
checkToken ?= jwtArr[2]
```
* 2. 解析数据 * 
```
//　校验签名通过，解析载荷的base64数据
let jwtPayload = JSON.parse(Buffer.from(jwtArr[1],'base64').toString())
```

