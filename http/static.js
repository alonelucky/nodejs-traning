const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

// 获取启动时传入的文件夹,默认为当前文件夹
let staticDir = process.argv.slice(2)[0] || __dirname

// 创建服务器
http.createServer((req,res)=>{
	// 书写响应头信息,声明返回的是html
	res.writeHead(200,{'content-type':'text/html;charset=utf8'})
	//	使用querstring解析路由传入的中文字符
	let urlParse = Object.keys(querystring.parse(req.url))[0]
	// 组合目录文件夹
	let rootName = path.join(staticDir+'/'+urlParse)

	// 如果请求路由没有对应的文件或文件夹,返回404
	if(!fs.existsSync(rootName)){
		res.writeHead(404,{'Content-type':'text/plain'})
		res.write('Not Found')
		res.end()
		return
	}

	let dirArr
	// 如果路径是文件夹则读取文件夹内容
	if(fs.statSync(rootName).isDirectory()){
		dirArr = openDir(rootName).join('')
		res.write(dirArr)
		res.end()
		return 
	}
	// 如果是文件则,直接返回文件
	if(fs.statSync(rootName).isFile()){
		fs.createReadStream(rootName).pipe(res)
		return
	}
}).listen(3000,(err)=>{
	if(err){
		return console.log(err)
	}
	console.log('服务启动在3000端口')
})

// 读取文件夹内容,返回HTML列表
function openDir(path){
	//	 创建数组,用于保存组合的文件夹路径列表
	let newArr = []
	// 得到文件夹下的内容
	let arr = fs.readdirSync(path)
	// 如果文件夹下没有内容,则如下处理,并返回
	if(!arr.length){
		newArr[0]=`<li>当前文件夹下为空</li>`
		newArr.unshift(`<li><a href="../">../</a></li>`)
		return newArr
	}
	// 	如果文件夹下有内容,则循环将内容放入新数组中
	for (let i=0;i<arr.length;i++){
		newArr.push(`<li><a href="${arr[i]}/">${arr[i]}</a></li>`)
	}
	//	增加上一层返回链接
	newArr.unshift(`<li><a href="../">../</a></li>`)
	//	返回数组
	return newArr
}
