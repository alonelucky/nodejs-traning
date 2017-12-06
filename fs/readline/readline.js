const fs = require("fs")
const { createInterface } = require("readline")

// 获取模板的可写流,创建逐行读取,模板中有特定插入符号(此处为双下划线)
let readline = createInterface({
    input:fs.createReadStream("./db.example.js"),
    // 最终使用的文件
    output:fs.createWriteStream("./db.config.js")
})

// 模拟数据
let dbData = {
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"test"
}

// 逐行读取文件处理
readline.on("line",(chunk)=>{
    // 将当前行转换为字符串
    let str = chunk.toString()
    // 创建使用的正则用于匹配指定项
    let reg = /([a-z]){4,10}[:]/
    // 得到匹配结果
    let regResult = str.match(reg)
    // 如果没有匹配结果,则不处理直接写入文件
    if(!regResult){
        readline.output.write(chunk+"\n")
        return
    }
    // 如果有结果,处理结果(此处获取的结果比实际使用多一个冒号,所以截取去除)
    let keyStr = regResult[0].substr(0,regResult[0].length-1)
    // 处理并写入数据
    readline.output.write(str.replace("__",dbData[keyStr])+"\n")
})

// 读取结束,关闭可写流
readline.on("end",()=>{
    readline.output.close()
})