# 项目说明

## 目录结构
```
├── bin                             //存放可执行文件
├── build                           //存放构建脚本
|  └── script                       //目录存放npm执行的脚本
|  └── template                     //目录存放html,js静态模版
|  └── conf.js                      //构建脚本读取的常量配置
|  └── webpack.common.js            //webpack构建脚本公共部分
|  └── webpack.config.dev.js        //开发环境下构建配置
|  └── webpack.config.prod.js       //生产环境构建配置
├── dist                            //构建打包输出目录
├── doc                             //存放文档
├── resources                       //存放静态资源，例如图片。
├── src                             //存放代码源文件
|  └── common                       //存放公共部分
|  └── components                   //存放组件
|  └── pages                        //存放页面，这里存放打包入口文件
|  └── util                         //存放工具api
├── test                            //存放测试代码
``` 

## 相关指令

- 初始化
```
npm i
```

- 开发模式
```
npm start
```

- 编译输出生产资源
```
npm run build
```

- 创建一个页面入口,filename（文件名）必选、title（页面title）可选
```
npm run add filename title
```



