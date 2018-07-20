# dami-market
大米超市

### 项目使用
> 没有安装NodeJs需要先到官网上下载, 安装文件我已经传到群里面啦

将项目clone下来之后cd到项目目录下, 直接npm install
> npm 速度过慢的话, 就进行换源操作(设置成淘宝源), 输入以下命令
> 
> "npm config set registry https://registry.npm.taobao.org"

之后ng serve -o便可以访问 http://localhost:4200 来访问主页

> 记得新开一个终端, 输入npm run mock:server来运行模拟的后台服务器

### Mock插件
给出github链接
https://github.com/typicode/json-server#add-custom-routes

mock插件主要是用来模拟后端返回的数据
使用方法为
npm run mock:server
就可以开启一个模拟的服务器返回程序
而如何定义接口呢?
在src同级的mock目录下有一个data.json
```
{
  "people": {
    "data": {
      "id": 1,
      "name": "xp",
      "password": "xp",
      "sign": "test"
    },
    "status": true,
    "msg": null,
    "page": null
  }
}
```
意味着只要访问localhost:3030/people就会返回
```
{
    "data": {
      "id": 1,
      "name": "xp",
      "password": "xp",
      "sign": "test"
    },
    "status": true,
    "msg": null,
    "page": null
}
```

> **通过json-server.json可以修改端口号**

### VSCode插件
这里列出了几个插件, 推荐大家安装一下:
- Angular 6 Snippets 语法提示
- Beautify 代码格式化
- Document this 代码注释
- ESLint 代码风格
- Git History 代码版本管理
- TSLint 代码风格

### 关于自动生成代码
Angular-cli是可以自动生成代码的, 这里给出自动生成模块和服务的语法
- 生成模块 ng g c 模块名称
- 生成服务 ng g service 服务名称

### 关于类似ajax的网络请求调用
#### Step1
编写一个Service类, 参考src/data里面的data.service.ts
#### Step2
将该Service导入到app.module.ts里面
你需要
```
import { DataService } from "./data/data.service";
```
并且把Service添加到Providers里面, **注意加逗号分隔**
```
providers: [DataService, OtherService, ...]
```
#### Step3
在实际的需要的ts文件中引入, 包括几个要点
- 引入Service和Observer
```
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
```
- 在构造方法中添加参数
```
constructor(private data: DataService) { }
```
- 直接调用
```
this.data.getUsers().subscribe(
   data => this.users$ = data
);
```
我们甚至可以直接传一个类过去
```
this.user$ = new User(null, "testName", "testPwd", "testSign");
this.data.insertUser(this.user$).subscribe(
  result => window.alert(result['code'])
);
```

### Material风格的设计
Angular里面的Material包已经帮大家导入进去啦
具体使用看
https://material.angular.io/components/categories

### 酷炫的过渡动画库
https://www.npmjs.com/package/ngx-spinner






