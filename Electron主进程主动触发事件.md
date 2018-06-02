# Electron主进程主动触发事件
```
主进程发送到渲染进程，一般都是渲染进程开启（窗口加载完成状态下），所以一般 ipcMain/ipcRenderer这里便不方便使用了
```

### 方法一
利用 ipcMain/ipcRenderer 相互通信
创建同名监听事件
```javascript
ipcMain.on('action' ,(event ,arg) => {
    console.log(arg)
})

ipcRenderer.on('action' ,(event ,arg) => {
    ipcRenderer.send('action' ,'test')
})
// 主window窗口
win.webContents.send('action')
```
### 方法二
其实上便的例子就已经很好的展示了主进程与渲染进程之间的相互通信
```
// 这一步就是主进程向渲染进程主动发起的请求
win.webContents.send('action')
```
如上，可简化为
`index.html`
```
ipcRenderer.on('action' ,(event ,arg) => {
    // 得到传入的a的值
    console.log(arg)
})
```
`mian.js`
```
// 主进程相关处理
let a  = "asdasdasdasd"
win.webContents.send('action',a)
```