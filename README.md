# 项目说明

基于webpack+react打包的前端模版工程

## 目录结构

```hash
├── bin                             //存放可执行文件
├── build                           //存放构建脚本
|  └── https                        //目录存放https启动时的证书
|  └── loaders                      //目录存放webpack的自定义loader
|  └── script                       //目录存放npm执行的脚本
|     └── ftp                       //ftp上传dist中内容到服务器,此部分已提取到ftp-cli模块中
|     └── add                       //创建页面
|  └── template                     //目录存放html,js静态模版
|  └── conf.js                      //构建脚本读取的常量配置
|  └── webpack.common.js            //webpack构建脚本公共部分
|  └── webpack.config.dev.js        //开发环境下构建配置
|  └── webpack.config.prod.js       //生产环境构建配置
├── dist                            //构建打包输出目录
├── doc                             //存放文档
├── resources                       //存放小的静态资源,例如小图片，打包后，图片会被转成base64。
├── src                             //存放代码源文件
|  └── common                       //存放公共部分
|  └── components                   //存放组件
|  └── pages                        //存放页面，这里存放打包入口文件
|  └── util                         //存放工具api
├── test                            //存放测试代码
├── ftp.config.js                   //ftp server配置列表
├── .babelrc.js                     //配置babel转换规则
├── .eslintignore                   //配置不进行eslint检查的文件
├── .eslintrc.js                    //配置eslint检查规则
```

## 相关指令

- 初始化

```bash
npm i
```

- 开发模式

```bash
http服务(mac下1024以内端口是要root权限，所以用8041端口，
通过pf配置端口转发，80转发到8041，mac下建议配置端口80，443端口转发)
npm start

https服务(mac下1024以内端口是要root权限，所以用8041端口，通过pf配置端口转发，443转发到8042)
npm start -- --https
```

- mock数据开发模式

```bash
http服务
npm run mock
或者
npm start -- --mock

https服务
npm run mock -- --https
或者
npm start -- --https --mock
```

- 编译输出生产资源

```bash
npm run build
```

- 创建一个页面入口,filename（文件名）必选、title（页面title）可选

```bash
Usage:
npm run add -- filename --title=<title>
或者
node ./build/script/add.js filename --title=<title>

Help:
npm run add -- --help
或者
node ./build/script/add.js --help
```

- 代码检查

```bash
npm run eslint

```

- ftp上传

```bash
npm run deploy
或者
node ./build/script/ftp/index.js

npm run deploy -- --all
或者
node ./build/script/ftp/index.js --all

Help:
npm run deploy -- --help
或者
node ./build/script/ftp/index.js --help
```

```bash
npm run ftp

npm run ftp -- --all

如果全局安装了ftp-cli的话，可以用通过ftp
-cli来代替npm run ftp和npm run deploy。deploy方式逐渐废弃掉
```

- git commit时触发 npm run eslint、git add

```hash
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "npm run eslint",
    "git add"
  ]
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

## Mac下端口转发配置

### 配置Mac系统中的端口转发（方法一）

修改/etc/pf.conf, 使用sudo vim /etc/pf.conf,在rdr-anchor "com.apple/*"后面添加一下配置

```hash
rdr on lo0 inet proto tcp from any to 127.0.0.1 port 80 -> 127.0.0.1 port 8041
rdr on lo0 inet proto tcp from any to 127.0.0.1 port 80 -> 127.0.0.1 port 8042
```

修改后保存，执行以下命令

```hash
sudo pfctl -d
sudo pfctl -f /etc/pf.conf
sudo pfctl -e
```

可以用以上命令做成开机自启动，这样就不用每次重启电脑后，需要手动执行以上命令来启用端口转发

### 通过Charles代理工具配置端口转发（方法二）

```hash
菜单>Proxy>Port Forwarding
```

## 相关文档

### Eslint

- [https://eslint.org](https://eslint.org)
- [https://github.com/yannickcr/eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [https://github.com/prettier/eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [https://github.com/prettier/eslint-config-prettier](https://github.com/prettier/eslint-config-prettier/)
- [https://prettier.io](https://prettier.io)
- [腾讯alloyteam的eslint规范](https://alloyteam.github.io/eslint-config-alloy/)

### 代码部署到ftp服务器

- 通过git-ftp工具来部署构建后的资源到ftp上

  [Linux、Mac、Window下的git-ftp安装](https://github.com/git-ftp/git-ftp/blob/master/INSTALL.md)

- 通过脚本将打包好的资源上传到服务器上

  [ftp-cli](https://github.com/recmh/ftp-cli)
  [node-ftp](https://github.com/mscdex/node-ftp)

### CLI

- [chalk，控制命令行输出样式](https://github.com/chalk/chalk)
- [ora，命令行内容输出](https://github.com/sindresorhus/ora)，ora内部基于[cli-spinners](https://github.com/sindresorhus/cli-spinners)
- [meow，接收命令行参数](https://github.com/sindresorhus/meow)
- [inquirer，交互式命令行控制](https://github.com/SBoudrias/Inquirer.js)
- [inquirer，使用demo](https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples)

### 测试（项目采用jest）

- [jest](https://github.com/facebook/jest)
- [jest文档](https://jestjs.io/docs/en/cli)
- [karma](https://github.com/karma-runner/karma) + [karma-jasmine](https://github.com/karma-runner/karma-jasmine)+ [jasmine](https://github.com/jasmine/jasmine)

### CI

- [travis](https://travis-ci.org)
- [travis文档,配置](https://docs.travis-ci.com/user/tutorial/)
