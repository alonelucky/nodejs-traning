# js排序算法实现


冒泡排序法使用很普遍和简单,此处不在列举

### 1. 快速排序
###### 1. 给定数组
```
let arr = [6,1,2,12,7,9,3,4,3,5,8,10]
```
###### 2. 原理解析

找任意数组中的数字作为`基数`,其余元素与该元素比较分别放置在左右两侧,第一次排序结束
```
[ 3, 1, 2, 5, 3, 4, 6, 9, 7, 12, 8, 10 ]
```

例如左侧为`i`开头,右侧为`j`

```javascript
// 倒置循环,j不能比i小
for(let j=arr.length-1;j<i;j--){
	if(arr[j]<arr[0]){
		// 如果找到比基数小的值,则从i开始循环,i不应大于j
		for(let i=0;i<j;i++){
			if(arr[i]>arr[0]){
				// 找到比基数大的值,然后将arr[j]和arr[i]交换位置
				// [arr[i],arr[j]] = [arr[j],arr[i]]  // es6语法,解构赋值
				let tmp = arr[i]
				arr[i] = arr[j]
				arr[j] = tmp
				break // 终止后续i的循环,保证一次只交换一个
			}
		}
	}
}
```
此时,结果应为
```
[ 6, 1, 2, 5, 3, 4, 3, 9, 7, 12, 8, 10 ]
```
交换基数和中界点的值
```
// 此时的i为交界位置
let tmp = arr[i]
arr[i] = arr[0]
arr[0] = tmp
```
得到第一次完整排序的几结果
```
[ 3, 1, 2, 5, 3, 4, 6, 9, 7, 12, 8, 10 ]
```
至此,第一次循环结束,后续调用则以`6`所在位置为界,作为两部分 ` arr.slice(0,i-1) ,arr.slice(i+1,arr.length-1)` 分别继续排序

###### 3. 函数封装

使用` for `循环

	function quickSort(arr,left,right){
		if(arr.length<1||left>right){
			// 如果数组长度小于1(元素少于1个就不用排序了)
			// 如果左侧索引大于右侧索引(没有比较的必要了)
			return
		}

		// 获取基数的值
		let key = arr[left]
		// 后边需要比较,先定义
		let i = left
		let j = right
		// 从右侧查找比基数大的值
		for(;j>i;j--){
			if(arr[j]<key){
				// 如果arr[j]小于基数key,则从左侧找到比key大的值
				for(;i<j;i++){
					// 如果找到,就交换位置
					if(arr[i]>key){
						let tmp = arr[i]
						arr[i] = arr[j]
						arr[j] = tmp
						break // 只执行当前一次
					}
				}
			}
		}
		// 交换基数和中届的值
		arr[left]=arr[i]
		arr[i]=key

		quickSort(arr,left,i-1)
		quickSort(arr,i+1,right)
	}

使用` while `循环


	function quickSort(arr,left,right){
		// ...前边判断和定义一样

		// 这里将for循环修改为while循环
		while(j>i){
			// 判断j是否大于i,执行循环
			if(arr[j]<key){
				// 如果存在比key小的
				while(i<j){	
					// 则从左侧循环获取
					if(arr[i]>key){
						// 交换
						let tmp = arr[i]
						arr[i] = arr[j]
						arr[j] = tmp
						break // 只执行当前一次
					}
					i++
				}
			}
			j--
		}
		
		// ...后边递归一样
	}

###### 4. 运行效率

时间复杂度为 : O(nlogn)
空间复杂度 : 
