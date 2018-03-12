# imooc-music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Vue-开发移动端音乐WebApp


## webpack.base.conf.js别名配置
```
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common')
    }
  },
```


## es6转义
npm install babel-runtime --save
## 移动端点击300ms延迟
cnpm install fastclick --save
## 补丁，es6转义
cnpm install babel-polyfill --save-dev


## 3-2
## router, tab


## 4-1
## 后端数据
## chrome 工具使用
## 从qq音乐抓取数据
https://m.y.qq.com/
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg


## 4-2
## jsonp原理:
> 动态创建script标签,没有同源限制，可以跨域，script src指向服务端地址
## install jsonp
cnpm install jsonp --save
## jsonp.js 封装


## 4-3
cnpm install axios --save
## 轮播图数据抓取
## recommend.js 抓取数据函数
## config.js 配置参数, qq音乐里面定义好的数据, fcg
## 发送jsonp请求


## 4-4, 4-5, 4-6
## 轮播图组件
cnpm install better-scroll@^0.1.15 --save


## 4-7
## 歌单数据接口


## 4-8
## 介绍和后端接口代理
cnpm install axios --save
## build > webpack.dev.conf.js
## 1.修改config目录下的index.js文件
## 修改host
> /config/index.js
```
host: '0.0.0.0',
```
## 2.修改webpack.dev.conf.js
> /build/webpack.dev.conf.js


## 4-9 歌单列表组件


## 4-10 SCROLL组件


## 4-11 防止轮播图延迟加载，导致高度缺失


## 4-12 
## 图片懒加载
cnpm install vue-lazyload --save
## needsclick


## 4-13 loading


## 5-1 --- 5-2
## singer后端接口


## 5-3
## 歌手数据
https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=295327561&jsonpCallback=GetSingerListCallback&loginUin=583520052&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0


## 5-4
## singer.vue 界面实现


## 5-5 -- 5-6 -- 5-7 -- 5-8 
## listivew.vue 右侧滚动


## 5-9
## fixtitle


