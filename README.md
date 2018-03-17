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


## 2-2
vue init webpack imooc-music


## webpack.base.conf.js别名配置
## 使用后在main.js直接引入
import 'common/scss/index.scss'
```
context: path.resolve(__dirname, '..', dir),
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'api': resolve('src/api'),
      'base': resolve('src/base'),
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
> 动态创建script标签,没有同源限制，可以跨域，script src地址指向第三方的API网址
> 并提供一个回调函数来接收数据,第三方产生的响应为json数据的包装
> 浏览器会调用callback函数，并传递解析后json对象作为参数。
> 本站脚本可在callback函数里处理所传入的数据。   
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
cnpm install better-scroll@0.1.15 --save


## 4-7
## 歌单数据接口


## 4-8
## 介绍和后端接口代理 
## ajax库axios,发起HTTPRequest
cnpm install axios --save
## 1.修改config目录下的index.js文件
## 修改host
> /config/index.js
```
host: '0.0.0.0',
```
## 2.修改/build/webpack.dev.conf.js
> 异步定义后端接口
## 3. recommend.js -> getDiscList 调用后端接口


## 4-9 
## 歌单列表组件


## 4-10 
## scroll组件


## 4-11 
## 防止轮播图延迟加载，导致高度缺失


## 4-12 
## 图片懒加载
cnpm install vue-lazyload --save
## class="needsclick"


## 4-13 
## loading


## 5-1, 5-2
## singer 后端接口


## 5-3
## 歌手数据
https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=295327561&jsonpCallback=GetSingerListCallback&loginUin=583520052&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
## singer 数据处理


## 5-4
## singer.vue 界面实现


## 5-5, 5-6, 5-7, 5-8 
## listivew.vue 右侧滚动


## 5-9
## fixtitle


## 5-10****
## 区块切换时，fixtitle有顶上去的效果
## loading


## 6-1
## introduce


## 6-2
## 子路由跳转到singer-detail bug


## 6-3, 6-4 
## Vuex
## cnpm install vuex --save 


## 6-5, 6-7
## 歌手数据


## 6-8
## music-list 传入数据


## 6-9
## 列表数据


## 6-10, 6-11, 6-12
## 滚动效果


## 6-13
## 不同浏览器css的配置 bug!


## 6-14
## 返回按钮,加载效果


## 7-1
## introduce


## 7-2
## vuex


## 7-3
## vuex


## 7-4
## 播放器基本设置


## 7-5, 7-6, 7-7
## 动画效果
## 不同浏览器css的配置 bug!


## 7-8, 7-9, 7-10
## 歌曲控件,播放,前进,站厅,旋转
