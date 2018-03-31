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
### (build/webpack.base.config)
> 别名配置, 缩写应用文件路径


## 3-2
### (tab.vue)
### 导航切换
### 路由


## 4-1
### Back-end data
### chrome use(static -> jsonp1.png)
### Fetching data from QQ music
```
https://m.y.qq.com/
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
```


## 4-2
### jsonp封装
### (common/js/jsonp.js)
### Promise
> 就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），
> 并且这个事件提供统一的 API，可供进一步处理。
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
**promise**
**jsonp**


## 4-3
### (api/config(配置参数)) (api/recommend.js(数据抓取))
### recommend.vue 调用 recommend.js 来获取后台数据
```
cnpm install axios --save
```


## 4-4, 4-5, 4-6 
### (recommend.vue) (common/js/dom.js)
### 轮播图组件
### qq数据<https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg>
### 
```
cnpm install better-scroll@0.1.15 --save
```


## 4-7
### (recommend.js)
### 抓取歌单数据接口
### 500服务器端错误, host问题


## 4-8
### (build/webpack.dev.conf.js) 
### 后端接口代理绕过qq检查
### ajax库axios,发起HTTPRequest
```
cnpm install axios --save
```
### 1.修改config目录下的index.js文件
### 修改host
> (config/index.js)
```
host: '0.0.0.0',
```
### 2.修改/build/webpack.dev.conf.js
> 异步定义后端接口
### 3. recommend.js -> getDiscList 调用后端接口


## 4-9 
### (recommend.vue)
### 歌单列表组件
### 访问 /api/getDiscList 来查看从qq音乐抓取的数据


## 4-10 
### (scroll.vue)
### scroll组件


## 4-11 
### 防止轮播图延迟加载, 造成高度计算错误
### 调用better-scroll要保证dom已经渲染,数据变化或者dom变化,better-scroll要调用refresh


## 4-12 
### 图片懒加载: 仅在滚动时加载
```
cnpm install vue-lazyload --save
```
### class="needsclick" : fastclick 不拦截单击过程


## 4-13 
### (loading.vue)


## 5-1
### introduce 歌手界面


## 5-2
### 获取qq歌手数据


## 5-3
### (singer.vue)
### 歌手数据处理
> <https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=295327561&jsonpCallback=GetSingerListCallback&loginUin=583520052&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0>


## 5-4
### (listview.vue)
### 歌手界面组件实现


## 5-5, 5-6, 5-7, 5-8 
### (listivew.vue)
### 歌手界面右侧滚动组件
### clientHeight


## 5-9
### fixtitle设置


## 5-10
### 区块切换时，fixtitle有顶上去的动画
### loading


## 6-1
### introduce


## 6-2
### 子路由跳转到singer-detail


## 6-3, 6-4 
### Vuex
```
cnpm install vuex --save 
```


## 6-5
### 抓取歌曲数据


## 6-6, 6-7
### song类封装, 歌曲列表数据处理


## 6-8
### (music-list.vue)
### 歌手界面处理


## 6-9
### (song-list.vue)
### 歌曲列表数据


## 6-10, 6-11, 6-12
### (song-list.vue)
### 歌曲列表滚动效果


## 6-13
### (common -> js -> dom.js)
### 不同浏览器css的配置


## 6-14
### (music-list.vue)
### 返回按钮,加载效果


## 7-1
### introduce


## 7-2
### vuex数据定义


## 7-3
### (player.vue)
### vuex的具体使用


## 7-4
### (player.vue)
### vuex数据应用


## 7-5, 7-6, 7-7
### (player.vue)
### 动画效果
### 不同浏览器css的配置
```
cnpm install create-keyframe-animation --save
```


## 7-8
### 歌曲控件: 前进后退


## 7-9
### 歌曲控件: 防止极限点击


## 7-10
### 歌曲控件: 播放时间


## 7-11
### 获取歌曲播放时间


## 7-12, 7-13, 7-14
### (progress-bar.vue)
### 歌曲控件: 歌曲进度条


## 7-15
### (progress-circle.vue)
### mini 播放器环形进度条


## 7-16
### 歌曲控件: 播放模式改变


## 7-17
### 各种播放模式情况处理


## 7-18
### 歌曲控件: 播放模式改变 fix bug


## 7-19
### 抓取歌词数据
### qq音乐播放歌曲界面 -> chrome network -> js fcg preview
### 点击fcg就可以在chrome里显示url
### (api/song.js) 1: 前端调用,前台定义代理地址给后台
### (webpack.dev.conf.js) 2: 后端绕过qq音乐限制,输出请求内容出去
### (common/js/song.js) 3: 前端调用后端的输出内容
### (player.vue) 4: 组件里面使用输出内容


## 7-20
### 播放器歌词数据解析
### base64解码
```
cnpm install js-base64 --save
```
### 视频作者编写, 歌词解析, 每执行到时间点时都执行回调函数
```
cnpm install lyric-parser
```


## 7-21
### (player.vue)
### 歌词滚动


## 7-22, 7-23
### (player.vue)
### 歌词界面和唱片界面切换


## 7-24
### (player.vue)
### bug fix


## 7-25
### (music-list.vue)
### mixin.js: 公共代码
### 设置mini播放器的正确位置显示


## 8-1
### (disc.vue)
### 歌单详情页Vuex数据通讯


## 8-2
### (api/recommend.js)抓取失败
### 歌单详情页数据抓取


## 8-3
### (disc.vue)
### 歌单详情页数据应用


## 9-1
### (rank.vue)
### 排行榜界面: 抓取数据


## 9-2
### (rank.vue)
### 排行榜界面: 数据应用


## 9-3
### (top-list.vue)
### 排行榜详情界面: Vuex数据通讯


## 9-4
### (top-list.vue)
### 排行榜详情界面: 抓取数据和应用


## 9-5
### (top-list.vue)
### 排行榜详情界面: 组件扩展, 前三排行奖杯


## 10-1
### 介绍搜索界面


## 10-2
### (search.vue)
### (search-box.vue)
### 搜索界面: 搜索框


## 10-3
### (api/search.js)
### 搜索界面: 抓取数据


## 10-4
### 搜索界面: 搜索功能


## 10-5
### 搜索界面: 下拉加载

 
## 10-6, 10-7, 10-8, 10-9
### 搜索界面: 点击搜索界面搜索结果


## 10-10
### 搜索界面: 优化
### 当没有搜索结果时返回404(no-result.vue)
### 优化请求节流函数
### 滚动时失去焦点


## 10-11, 10-12, 10-13
### (common/js/cache.js)
### 搜索界面: 搜索历史数据缓存到localStorage
```
cnpm install good-storage --save
```


## 10-14, 10-15, 10-16
### 搜索界面: 搜索历史记录操作


## 10-17
### 搜索界面: 搜索歌曲滚动设置


## 10-18
### 搜索界面: 设置mini播放器的正确位置显示


## 11-1
### mini播放器最右侧的按钮点击后弹出的窗口
### mini歌曲列表：布局和功能介绍


## 11-2
### (playlist.vue)
### mini歌曲列表：显示和隐藏的控制


## 11-3
### (playlist.vue)
### mini歌曲列表：vuex数据


## 11-4
### (playlist.vue)
### mini歌曲列表：滚动到当前播放歌曲位置


## 11-5, 11-6
### (playlist.vue)
### mini歌曲列表：删除一首歌曲


## 11-7
### (playlist.vue)
### mini歌曲列表：删除一首歌曲的动画


## 11-8, 11-9
### mixin公共js


## 11-10
### (add-song.vue)
### mini歌曲列表：'添加歌曲到列表'的显示和隐藏的控制


## 11-11
### (add-song.vue)
### 添加歌曲到列表：保存搜索结果到localStorage


## 11-12
### (switches.vue)
### 添加歌曲到列表： 切换歌曲列表组件的两个按钮


## 11-13, 11-14
### (add-song.vue)
### 添加歌曲到列表: 最近播放列表


## 11-15
### (add-song.vue)
### 添加歌曲到列表: 搜索历史


## 11-16
### (top-tip.vue)
### 添加歌曲时提示组件: 顶部提示


## 11-17
### (add-song.vue)
### 添加歌曲到列表: fix-bug


## 12-1
### (user-center.vue)
### 点击❤️按钮跳转到用户中心
### 用户中心页: 切换 '我喜欢的' '最近听的'


## 12-2
### (actions.js) (cache.js)
### 用户中心页: vuex数据通讯


## 12-3
### (user-center.vue)
### 用户中心页: 收藏功能处理


## 12-4
### (user-center.vue)
### 用户中心页: 添加歌曲到列表


## 12-5, 12-6
### (user-center.vue)
### 用户中心页: 回退按钮功能, 随机播放按钮功能, 404界面


## 13-1
### (player.vue)
### 优化: 1, 2, 3


## 13-2
### 编译打包, 后端调用
```
npm run build
```
### (config/index.js)
```
build(){port: 9000}
```
### (prod.server.js)
```
node prod.server.js
```
### chrome -> localhost:9000


## 13-3
### (router/index.js)
### 路由懒加载
### npm run build
### node prod.server.js


## 13-4
### (package.json)
### vue升级, 修改package.json版本号
> "vue"版本号和"vue-template-compiler"要相等


## 14-1
### (main.js)
### 移动端调试, 界面多了一个绿色的按钮vConsole
<https://github.com/Tencent/vConsole>
```
cnpm install vconsole
```
### 抓包工具charies(Mac) , Fiddler(Win)
### 默认有个8888端口
### 电脑IP
```
ifconfig
```
### iphone代理, 无线局域网, 配置代理, 代理IP手动, 电脑IP, 8888端口。 实现代理到charies
### android 局域网, 修改网络, 配置http代理, 服务器电脑IP, 8888端口。 实现代理到charies
