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
### init project template
```
vue init webpack imooc-music
```
### select 'RunTime-only'
### vue-router 'Y'
### ESLint 'Y' (es6 style checker)
### karma, e2e test 'N'
### start App
```
npm run dev
```


## 2-3
### Project introduce:
### api: (backend request, jsonp request, AJAX request)
### common: (static resources: img, common js, style file)
### components: (components)
### base: (basic components)
### router: (router)
### store: (Vuex)
### main.js: entrance
### npm install (scss)
```
"sass-loader": "^6.0.7",
"node-sass": "^4.7.2",
```
### webpack.base.conf.js alias configuration
### After use directly introduce the corresponding file in Main.js
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


## 3-1
### App.vue
### es6 escape
```
npm install babel-runtime --save
```
### Mobile End Clicks 300MS Delay
```
cnpm install fastclick --save
```
### path，es6 api escape
```
cnpm install babel-polyfill --save-dev
```


## 3-2
### tab.vue: navigation bar
### router


## 4-1
### Back-end data
### chrome use(static -> jsonp1.png)
### Fetching data from QQ music
```
https://m.y.qq.com/
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
```


## 4-2
### jsonp package
### (common -> js -> jsonp.js)
### Promise
> 就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。
### jsonp原理: 
> 解决跨域问题
> 动态创建script标签,没有同源限制，可以跨域，script src地址指向第三方的API网址
> 并提供一个回调函数来接收数据,第三方产生的响应为json数据的包装
> 浏览器会调用callback函数，并传递解析后json对象作为参数。
> 本站脚本可在callback函数里处理所传入的数据。   
### install jsonp
```
cnpm install jsonp --save
```


## 4-3
### recommend数据抓取
### (api -> config(配置参数)) (api -> recommend)
### 发送jsonp请求,抓取qq音乐里面的数据,
### 请求后台数据
```
cnpm install axios --save
```


## 4-4, 4-5, 4-6
### (recommend.vue) (common -> js -> dom.js)
### <https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg>
### 轮播滚动组件(作者开发)
```
cnpm install better-scroll@0.1.15 --save
```


## 4-7
### 抓取歌单数据接口
### 500服务器端错误, host问题


## 4-8
### 后端接口代理
### (build -> webpack.dev.conf.js) 
### ajax库axios,发起HTTPRequest
```
cnpm install axios --save
```
### 1.修改config目录下的index.js文件
### 修改host
> /config/index.js
```
host: '0.0.0.0',
```
### 2.修改/build/webpack.dev.conf.js
> 异步定义后端接口
### 3. recommend.js -> getDiscList 调用后端接口


## 4-9 
### 歌单列表组件
### (recommend.vue)
### 访问 /api/getDiscList 来查看从qq音乐抓取的数据


## 4-10 
### scroll组件


## 4-11 
### 防止轮播图延迟加载, 造成高度计算错误


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
## vuex数据操作定义


## 7-3
## vuex的具体使用


## 7-4
## 播放器基本设置


## 7-5, 7-6, 7-7
## 动画效果
## 不同浏览器css的配置 bug!
## 动画
```
cnpm install create-keyframe-animation --save
```


## 7-8, 7-9, 7-10
## 歌曲控件,播放暂停,前进后退,控件失效


## 7-11
## 获取歌曲播放时间


## 7-12, 7-13, 7-14
## 不同浏览器css的配置
## 歌曲进度条, 可以拖动


## 7-15
## mini 播放器环形进度条
## svg


## 7-16, 7-17, 7-18 
## 播放模式改变,播放列表改变


## 7-19
## 抓取歌词数据:
## qq音乐播放歌曲界面 -> chrome network -> js fcg preview
## 点击fcg就可以在chrome里显示url
## (api/song.js) 1: 前端调用,前台定义代理地址给后台
## (webpack.dev.conf.js) 2: 后端绕过qq音乐限制,输出请求内容出去
## (common/js/song.js) 3: 前端调用后端的输出内容
## (player.vue) 4: 组件里面使用输出内容


## 7-20
## 播放器歌词数据解析
## base64解码
```
cnpm install js-base64 --save
```
## 视频作者编写, 歌词解析, 每执行到时间点时都执行回调函数
```
cnpm install lyric-parser
```


## 7-21
## 歌词滚动


## 7-22, 7-23
## 歌词界面和唱片界面能左右切换


## 7-24
## bug fix


## 7-25
## mixin.js: 公共代码
## 设置mini播放器的正确位置显示


## 8-1
## 歌单详情页Vuex数据通讯


## 8-2
## 歌单详情页数据抓取
## (api/recommend) 1: 


## 8-3
## https://y.qq.com/w/taoge.html?ADTAG=newyqq.taoge&id=3261874488
## 歌单详情页数据应用
## bug! jp1 is not defined !


## 9-1
## 排行榜界面抓取数据,jsonp请求


## 9-2
## 排行榜界面数据应用


## 9-3
## 排行榜详情界面Vuex数据通讯


## 9-4
## 排行榜详情界面抓取数据和应用,jsonp请求


## 9-5
## 排行榜详情界面组件扩展, 前三排行奖杯


## 10-1
## introduce search-page


## 10-2
## search-box的搜索栏


## 10-3
## search jsonp


## 10-4
## 搜索歌曲功能


## 10-5
## 下拉加载

 
## 10-6, 10-7, 10-8, 10-9 ?
## 歌曲歌手点击, 点击搜索界面歌曲并添加到播放列表


## 10-10
## 当没有搜索结果时返回404
## 优化请求节流函数
## 滚动时失去焦点


## 10-11, 10-12, 10-13 ?
## 搜索历史数据
## 缓存, localStorage
```
cnpm install good-storage --save
```


## 10-14
## 搜索历史记录展示


## 10-15
## 删除历史记录缓存


## 10-16
## 确定对话框, 是否删除缓存


## 10-17
## 搜索歌曲滚动设置


## 10-18
## 设置mini播放器的正确位置显示


## Git branch: playlist-page
## mini播放器最右侧的按钮点击后弹出的窗口
## 11-1
## 歌曲列表组件布局和功能介绍


## 11-2
## 歌曲列表组件显示和隐藏的控制


## 11-3, 11-4, 11-5, 11-6, 11-7
## 歌曲列表组件播放列表的实现


## 11-8, 11-9
## mixin公共js


## 11-10
## add-song的显示和隐藏的控制


## 11-11
## suggest: 搜索后呈现的界面
## mixin


## 11-12
## switches: 切换歌曲列表组件的两个按钮


## 11-13, 11-14
## 歌曲列表组件,最近播放列表


## 11-15
## search-list: 搜索历史


## 11-16
## 添加歌曲时提示组件


## 11-17
## fix-bug


## 12-1
## 用户个人中心页, switch切换


## 12-2
## 收藏功能vuex数据通讯


## 12-3
## 收藏功能点击处理


## 12-4
## 收藏功能实现 '我喜欢列表' 和 '最近听的' 列表


## 12-5, 12-6
## 回退按钮功能, 随机播放按钮功能
## 用户个人中心页完成