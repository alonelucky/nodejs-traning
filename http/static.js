const http = require('http')
const fs = require('fs')
const path = require('path')

// 获取启动时传入的文件夹,默认为当前文件夹
let staticDir = process.argv.slice(2)[0] || __dirname

// 创建服务器
http.createServer((req,res)=>{
	// 书写响应头信息,声明返回的是html
	res.writeHead(200,{'content-type':'text/html;charset=utf8'})
	// 组合目录文件夹
	let rootName = path.join(staticDir+'/'+req.url)

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
		dirArr = openDir(path.join(staticDir+'/'+req.url)).join('')
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
	let newArr = []
	let arr = fs.readdirSync(path)
	if(!arr.length){
		newArr[0]=`<li>当前文件夹下为空</li>`
		newArr.unshift(`<li><a href="../">../</a></li>`)
		return newArr
	}

	for (let i=0;i<arr.length;i++){
		newArr.push(`<li><a href="${arr[i]}/">${arr[i]}</a></li>`)
	}
	newArr.unshift(`<li><a href="../">../</a></li>`)
	return newArr
}
