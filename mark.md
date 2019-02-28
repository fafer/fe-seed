# 项目技术点

打包：webpack
框架：react
编译：babel
code：es6、jsx、ts、tsx
css：scss、postcss
规范：eslint、tslint、stylelint
代码格式化：prettier
单元测试：jest，或者karma+karma-jasmine+jasmine
CI：travis
命令行：chalk、ora、meow、inquirer
测试覆盖面
拆包：lerna
构建部分引入html-webpack-plugin
**提炼构建部分为cli**
接入jenkis
**引入node的server端**
**node服务的部署与管理**
nginx部署web
linux部署
集成开发环境vagrant
**接入docker**
**node与异构系统通信，诸如java、python**

## 问题

**linux下ssh方式git clone时，出现普通用户失败，root用户能正常拉取代码。https方式则是都正常**
**是否可以把hash版本号加入进构建脚本中**