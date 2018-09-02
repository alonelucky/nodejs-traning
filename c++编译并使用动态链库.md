## c++编译并使用动态链库
```
gcc/g++的编译参数，这里只介绍 -L 、-l、-include、-I、-shared、-fPIC
-L ：表示要链接的库所在的目录。-L.  表示要链接的库在当前目录， -L/usr/lib 表示要连接的库在/usr/lib下。目录在/usr/lib时，系统会自动搜索这个目录，可以不用指明。
-l (L的小写)：表示需要链接库的名称，注意不是库文件名称，比如库文件为 libtest.so，那么库名称为test
-include ：包含头文件，这个很少用，因为一般情况下在源码中，都有指定头文件。
-I (i 的大写)：指定头文件的所在的目录，可以使用相对路径。
-shared ：指定生成动态链接库
-fPIC：  表示编译为位置独立的代码，不用此选项的话编译后的代码是位置相关的所以动态载入时事通过代码拷贝的方式来满足不同进程的需要，而不能达到真正代码共享的目的。
```
#### 1. 编译为动态链库
1. 源码
```
// 头文件filename: class.h
#ifndef class_h
#define class_h

/**
 *  定义一个类
 * */
class Person{
    private:
        int age;
        char* name;

    public:
        Person(int a,char* n);
        double hight;
        void sayHello();
};  

#endif

// 源码文件filename: class.cpp
#include <iostream>
#include "class.h"

using namespace std;

Person::Person(int a,char* n){
    this->age = a;
    this->name = n;
}

void Person::sayHello(){
   cout << "Hello, my name is " << this->name << ", my age is " << this->age << endl;
}
```
2. 执行编译
```
# libtest.so 生成的动态链库名称
g++ -fPIC -shared -o libtest.so class.cpp
```
#### 2. 使用动态链库
1. 源码
```
#include "class.h"

int main(){
    char name[] = "asdasd";    
    char* c = name;
    Person* p = new Person(12,c);
    p->sayHello();
    return 0;
}
```
2. 编译
```
# -I 制定头文件加载目录
# -L 制定库文件加载目录
# -l 链库名称不包含lib前缀及后缀名
g++ hello.cpp -I ./ -L./ -ltest
```
















