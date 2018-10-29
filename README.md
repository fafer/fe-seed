# 项目说明

## 目录结构

```hash
├── bin                             //存放可执行文件
├── build                           //存放构建脚本
|  └── https                        //目录存放https启动时的证书
|  └── loaders                      //目录存放webpack的自定义loader
|  └── script                       //目录存放npm执行的脚本
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
```

## 相关指令

- 初始化

```hash
npm i
```

- 开发模式

```hash
http服务(mac下1024以内端口是要root权限，所以用8041端口，通过pf配置端口转发，80转发到8041，mac下建议配置端口80，443端口转发)
npm start

https服务(mac下1024以内端口是要root权限，所以用8041端口，通过pf配置端口转发，443转发到8042)
npm start -- --https
```

- mock数据开发模式

```hash
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

```hash
npm run build
```

- 创建一个页面入口,filename（文件名）必选、title（页面title）可选

```hash
npm run add filename title
```

## Mac下端口转发配置

### 配置Mac系统中的端口转发（方法一）

修改/etc/pf.conf, 使用sudo vim /etc/pf.conf,在rdr-anchor "com.apple/*"后面添加一下配置

```hash
rdr on lo0 inet proto tcp from any to 127.0.0.1 port 80 -> 127.0.0.1 port 8041
rdr on lo0 inet proto tcp from any to 127.0.0.1 port 80 -> 127.0.0.1 port 8042
```

修改后保存，执行一下命令

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

- [https://eslint.org](https://eslint.org)