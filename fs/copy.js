const fs = require('fs')
let pathArr = process.argv.slice(2)

copyAll(pathArr[0],pathArr[1])
// 文件夹递归复制
/*
	
	params 	String 	目标文件夹
	params 	String 	目的文件夹  	
	
*/
function copyAll(path,topath){
	// 判断目标文件夹是否存在
	if(!fs.existsSync(path)){
		return console.error('目标文件夹不存在')
	}
	// 读取文件夹内容
	let fileArr = fs.readdirSync(path)
	// 判断目的文件夹是否存在,不存在则创建
	if(!fs.existsSync(topath)){
		fs.mkdirSync(topath);
	}
	// 循环遍历文件夹下的对象
	for (let i=0;i<fileArr.length;i++){
		// 如果是文件夹则继续递归调用自身,遍历
		if(fs.statSync(path+'/'+fileArr[i]).isDirectory()){
			copyAll(path+'/'+fileArr[i],topath+'/'+fileArr[i])
		}
		// 如果是文件则复制过去,防止文件过大造成阻塞,使用文件流进行复制
		if(fs.statSync(path+'/'+fileArr[i]).isFile()){
			fs.createReadStream(path+'/'+fileArr[i]).pipe(fs.createWriteStream(topath+'/'+fileArr[i]))
		}
	}
}
