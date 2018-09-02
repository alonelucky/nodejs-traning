## c++编译并使用动态链库

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
















