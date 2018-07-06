## Cordova 百度地图实践

#### 1. 申请百度地图安卓端SDK
1. 创建sha1
进入用户根目录
```
# windows
C:\user\your_name\
# linux
/home/your_name/

# 进入安卓文件夹
cd .android
# 生成sha1
keytool -list -v -keystore debug.keystore
```

#### 2. 安装百度地图插件
[百度地图插件](https://www.npmjs.com/package/cordova-plugin-baidumaplocation)

```
cordova plugin add cordova-plugin-baidumaplocation --variable ANDROID_KEY="<API_KEY_ANDROID>" --variable IOS_KEY="<API_KEY_IOS>"
```

#### 3. 修改项目

```
项目文件夹/platform/android/app/src/main/
```
检查是否存在 `jniLibs` 文件夹,创建文件夹 jniLibs/

将插件目录 

`
 项目文件夹/plugins/cordova-plugin-baidumaplocation/libs/android
 `
 
 下的`armeabi` 文件夹复制到jniLibs下

#### 4. 运行项目
```
cordova run andorid
```