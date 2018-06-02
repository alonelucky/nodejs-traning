# Electron主进程主动触发事件
```
主进程发送到渲染进程，一般都是渲染进程开启（窗口加载完成状态下）
```

### 方法

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
