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


## 2-2: 项目安装
```
vue init webpack imooc-music
```
##### 'RunTime-only' 更加轻量
##### vue-router 'Y' vue路由
##### ESLint 'Y' ES6风格代码检查器
##### Standard
##### karma, e2e test 'N' 测试相关
##### npm install 安装依赖
##### 运行项目
```
npm run dev
```


## 2-3: 项目目录介绍
##### api: (后端请求, jsonp 请求, AJAX 请求)
##### common: (共用的静态资源: img, common js, style file)
##### components: (组件)
##### base: (共用组件)
##### router: (路由)
##### store: (Vuex相关)
##### main.js (入口)
##### npm install (scss依赖)
```
"sass-loader": "^6.0.7",
"node-sass": "^4.7.2",
```
##### webpack.base.conf.js 别名配置, 使用后直接在 main.js 中引入相应的文件。
import 'common/scss/index.scss'
```
context: path.resolve(__dirname, '..', dir),
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'api': resolve('src/api'),
      'base': resolve('src/base'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'router': resolve('src/router'),
      'store': resolve('src/store')
    }
  },
```


## 3-1: npm 依赖
##### (App.vue)
##### es6 编译辅助操作
```
npm install babel-runtime --save
```
##### 移动端点击300MS延迟。
```
cnpm install fastclick --save
```
##### es6 api 转义
```
cnpm install babel-polyfill --save-dev
```
##### (build/webpack.base.config)
> Alias configuration, abbreviated application file path.


## 3-2
##### (tab.vue) (App.vue) (route.vue)
##### Navigation switch


## 4-1
##### Back-end data
##### chrome use(static/jsonp1.png)
##### Fetching data from QQ music
```
https://m.y.qq.com/
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
```


## 4-2
##### (common/js/jsonp.js)
##### jsonp package
##### Promise
> Is an object that is used to deliver messages that are asynchronous. 
> It represents a future event (usually an asynchronous operation) that will know the result.
> And this event provides a unified API for further processing.
##### jsonp principle: 
> solves cross-domain problems
> creates a script tag dynamically, without the same-origin restriction, which can be cross-domain, 
> and the script SRC address points to the third-party API url.
> provides a callback function to receive the data, and the third party generates the response as a wrapper for the json data.
> The browser invokes the callback function and passes the parsed json object as a parameter
> This site script can handle incoming data in the callback function.
##### install jsonp
```
cnpm install jsonp --save
```
**promise**
**jsonp**


## 4-3
##### (api/config(config params)) (api/recommend.js(fetch data))
##### recommend.vue call recommend.js get back-end data
```
cnpm install axios --save
```


## 4-4
##### (recommend.vue) (slider.vue) (common/js/dom.js) 
##### 推荐界面: Shuffling figure component
##### qq data <https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg>
##### 
```
cnpm install better-scroll@0.1.15 --save
```


## 4-5
##### (slider.vue)
##### 推荐界面: Shuffling figure component indicating


## 4-6
##### (slider.vue)
##### 推荐界面: Shuffling figure component fix bug
##### Window changes.


## 4-7
##### (recommend.js)
##### Grab the song single data interface.
##### <keep-alive> To prevent flashing
##### 500 server error, host problem.


## 4-8
##### (build/webpack.dev.conf.js) 
##### The front end requests our back-end address, the back-end requests the qq server, 
##### the back-end interface agent bypasses the qq check.
##### ajax库axios,发起HTTPRequest
```
cnpm install axios --save
```
##### 1.修改config目录下的index.js文件
##### 修改host
> (config/index.js)
```
host: '0.0.0.0',
```
##### 2.修改/build/webpack.dev.conf.js
> 异步定义后端接口
##### 3. recommend.js -> getDiscList 调用后端接口


## 4-9 
##### (recommend.vue)
##### 推荐界面: 热门歌单推荐 
##### 访问 /api/getDiscList 来查看从qq音乐抓取的数据


## 4-10 
##### (scroll.vue)
##### scroll组件


## 4-11 
##### (recommend.vue)
##### 防止轮播图延迟加载, 造成高度计算错误
##### 调用better-scroll要保证dom已经渲染,数据变化或者dom变化,better-scroll要调用refresh


## 4-12
##### (recommend.vue)
##### 图片懒加载: 仅在滚动时加载
```
cnpm install vue-lazyload --save
```
##### class="needsclick" : fastclick 不拦截单击过程


## 4-13 
##### (loading.vue) (recommend.vue)
##### 推荐界面: 请求图


## 5-1
##### 歌手界面: introduce


## 5-2
##### (api/singer.js) (singer.vue)
##### Get qq singer data.


## 5-3
##### (singer.vue) (common/js/singer.js)
##### 歌手界面: Singer data processing
> <https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=295327561&jsonpCallback=GetSingerListCallback&loginUin=583520052&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0>


## 5-4
##### (listview.vue) (singer.vue)
##### 歌手界面: Write the artist's interface according to the singer's data.


## 5-5
##### (listivew.vue) (scroll.vue)
##### 歌手界面: Right scroll component, scroll


## 5-6, 5-7
##### (listivew.vue) (scroll.vue)
##### 歌手界面: Right scroll component, highlight


## 5-8
##### (listivew.vue) (scroll.vue)
##### 歌手界面: Right scroll component, fix bug


## 5-9
##### (listivew.vue)
##### 歌手界面: fixtitle


## 5-10
##### (listivew.vue) (loading.vue)
##### 歌手界面: fixtitle animate


## 6-1
##### 音乐播放界面: introduce


## 6-2
##### (singer-detail)
##### 子路由跳转到singer-detail


## 6-3
##### (static/vuex.png)
##### Vuex: 状态管理方式, 管理组件状态
```
cnpm install vuex --save 
```


## 6-4
##### Vuex配置
##### (store/index.js) 项目里使用vuex
##### (store/state.js) 定义基础数据
##### (store/mutation-types.js) 操作修改数据的动作名称
##### (store/mutations.js) 修改数据操作
##### (store/getters.js) 映射state数据, 取数据到组件中


## 6-5
##### (singer-detail.vue)
##### 音乐播放界面: 抓取歌曲数据


## 6-6, 6-7
##### (singer-detail.vue) (common/js/song.js)
##### 音乐播放界面: 歌曲列表数据处理
##### song类封装


## 6-8
##### (music-list.vue)
##### 音乐播放界面: 歌手界面处理


## 6-9
##### (song-list.vue)
##### 音乐播放界面: 歌曲列表


## 6-10, 6-11, 6-12
##### (song-list.vue)
##### 音乐播放界面: 歌曲列表滚动动画效果


## 6-13
##### (common/js/dom.js)
##### 音乐播放界面: 不同浏览器css的配置


## 6-14
##### (music-list.vue)
##### 音乐播放界面: 返回按钮, loading加载效果


## 7-1
##### introduce 音乐播放界面:


## 7-2
##### (store/state.js)
##### 音乐播放界面: 播放器vuex数据定义


## 7-3
##### (player.vue)
##### 音乐播放界面: vuex的具体使用


## 7-4
##### (player.vue)
##### 音乐播放界面: 全屏按钮


## 7-5, 7-6, 7-7
##### (player.vue)
##### 音乐播放界面: 动画效果
##### transition 的事件监听处理
##### 不同浏览器css的配置
```
cnpm install create-keyframe-animation --save
```


## 7-8
##### (player.vue)
##### 音乐播放界面: 歌曲控件播放


## 7-9
##### (player.vue)
##### 音乐播放界面: 歌曲控件前进后退, 防止极限点击


## 7-10
##### (player.vue)
##### 音乐播放界面: 歌曲控件防止极限点击, 组件变灰


## 7-11
##### (progress-bar.vue)
##### 音乐播放界面: 获取歌曲播放时间


## 7-12, 7-13, 7-14
##### (progress-bar.vue)
##### 音乐播放界面: 歌曲控件歌曲进度条


## 7-15
##### (progress-circle.vue)
##### 音乐播放界面: mini播放器环形进度条
##### SVG


## 7-16
##### (player.vue) (common/js/mixin.js)
##### 音乐播放界面: 歌曲控件播放模式样式改变


## 7-17
##### (common/js/mixin.js) (common/js/util.js)
##### 音乐播放界面: 各种播放模式情况处理
##### 洗牌函数 


## 7-18
##### (player.vue)
##### 音乐播放界面: 歌曲控件播放模式改变 fix bug


## 7-19
##### 抓取歌词数据
##### qq音乐播放歌曲界面 -> chrome network -> js fcg preview
##### 点击fcg就可以在chrome里显示url
##### (api/song.js) 1: 前端调用,前台定义代理地址给后台
##### (webpack.dev.conf.js) 2: 后端绕过qq音乐限制,输出请求内容出去,正则表达式
##### (common/js/song.js) 3: 前端调用后端的输出内容
##### (player.vue) 4: 组件里面使用输出内容


## 7-20
##### (player.vue)
##### 播放器歌词数据解析
##### base64解码和编码
```
cnpm install js-base64 --save
```
##### 视频作者编写, 歌词解析, 每执行到时间点时都执行回调函数
```
cnpm install lyric-parser
```


## 7-21
##### (player.vue)
##### 音乐播放界面: 歌词滚动


## 7-22, 7-23
##### (player.vue)
##### 音乐播放界面: 歌词界面和唱片界面切换


## 7-24
##### (player.vue)
##### 音乐播放界面: fix bug


## 7-25
##### (player.vue)
##### (common/js/mixin.js) 公共代码
##### 音乐播放界面: 设置mini播放器的正确位置显示


## 8-1
##### (route.js) (recommend.vue) (recommend.js) (mutations.js) (getter.js) (disc.vue)
##### 热门歌单: Vuex数据通讯


## 8-2
##### (api/recommend.js) 抓取失败
##### 热门歌单: 数据抓取


## 8-3
##### (disc.vue)
##### 热门歌单: 数据应用


## 9-1
##### (rank.vue)
##### 排行榜界面: 抓取数据


## 9-2
##### (rank.vue)
##### 排行榜界面: 数据应用


## 9-3
##### (top-list.vue)
##### 排行榜详情界面: Vuex数据通讯


## 9-4
##### (top-list.vue)
##### 排行榜详情界面: 抓取数据和应用


## 9-5
##### (top-list.vue)
##### 排行榜详情界面: 组件扩展, 前三排行奖杯


## 10-1
##### 搜索界面: 介绍搜索界面


## 10-2
##### (search.vue) (search-box.vue)
##### 搜索界面: 搜索框组件


## 10-3
##### (api/search.js)
##### 搜索界面: 抓取数据, 热门搜索


## 10-4
##### (suggest.vue) (api/search.js)
##### 搜索界面: 搜索功能


## 10-5
##### (suggest.vue)
##### 搜索界面: 下拉加载

 
## 10-6, 10-7, 10-8, 10-9
##### (store/action.js)
##### 搜索界面: 点击搜索界面的歌曲, 插入到播放列表里面


## 10-10
##### (suggest.vue) (no-result.vue)
##### 搜索界面: 优化, 当没有搜索结果时返回404, 优化请求节流函数, 滚动时失去焦点


## 10-11, 10-12, 10-13
##### (common/js/cache.js)
##### 搜索界面: 搜索历史数据缓存到localStorage
##### 作者开发
```
cnpm install good-storage --save
```


## 10-14, 10-15
##### (common/js/cache.js)
##### 搜索界面: 搜索历史记录操作, 储存入缓存, 删除缓存


## 10-16
##### (confirm.js)
##### 搜索界面: 确定提示框


## 10-17
##### (search.vue)
##### 搜索界面: 搜索歌曲滚动设置


## 10-18
##### (search.vue)
##### 搜索界面: 设置mini播放器的正确位置显示


## 11-1
##### mini播放器最右侧的按钮点击后弹出的窗口
##### mini歌曲列表：布局和功能介绍


## 11-2
##### (playlist.vue)
##### mini歌曲列表：显示和隐藏的控制


## 11-3
##### (playlist.vue)
##### mini歌曲列表：vuex数据


## 11-4
##### (playlist.vue)
##### mini歌曲列表：滚动到当前播放歌曲位置


## 11-5, 11-6
##### (playlist.vue)
##### mini歌曲列表：删除一首歌曲


## 11-7
##### (playlist.vue)
##### mini歌曲列表：删除一首歌曲的动画


## 11-8, 11-9
##### mixin公共js


## 11-10
##### (add-song.vue)
##### mini歌曲列表：'添加歌曲到列表'的显示和隐藏的控制


## 11-11
##### (add-song.vue)
##### 添加歌曲到列表：保存搜索结果到localStorage


## 11-12
##### (switches.vue)
##### 添加歌曲到列表： 切换歌曲列表组件的两个按钮


## 11-13, 11-14
##### (add-song.vue)
##### 添加歌曲到列表: 最近播放列表


## 11-15
##### (add-song.vue)
##### 添加歌曲到列表: 搜索历史


## 11-16
##### (top-tip.vue)
##### 添加歌曲时提示组件: 顶部提示


## 11-17
##### (add-song.vue)
##### 添加歌曲到列表: fix-bug


## 12-1
##### (user-center.vue)
##### 点击❤️按钮跳转到用户中心
##### 用户中心页: 切换 '我喜欢的' '最近听的'


## 12-2
##### (actions.js) (cache.js)
##### 用户中心页: vuex数据通讯


## 12-3
##### (user-center.vue)
##### 用户中心页: 收藏功能处理


## 12-4
##### (user-center.vue)
##### 用户中心页: 添加歌曲到列表


## 12-5, 12-6
##### (user-center.vue)
##### 用户中心页: 回退按钮功能, 随机播放按钮功能, 404界面


## 13-1
##### (player.vue)
##### 优化: 1, 2, 3


## 13-2
##### 编译打包, 后端调用
```
npm run build
```
##### (config/index.js)
```
build(){port: 9000}
```
##### (prod.server.js)
```
node prod.server.js
```
##### chrome -> localhost:9000


## 13-3
##### (router/index.js)
##### 路由懒加载
##### npm run build
##### node prod.server.js


## 13-4
##### (package.json)
##### vue升级, 修改package.json版本号
> "vue"版本号和"vue-template-compiler"要相等


## 14-1
##### (main.js)
##### 移动端调试, 界面多了一个绿色的按钮vConsole
<https://github.com/Tencent/vConsole>
```
cnpm install vconsole
```
##### 抓包工具charies(Mac) , Fiddler(Win)
##### 默认有个8888端口
##### 电脑IP
```
ifconfig
```
##### iphone代理, 无线局域网, 配置代理, 代理IP手动, 电脑IP, 8888端口。 实现代理到charies
##### android 局域网, 修改网络, 配置http代理, 服务器电脑IP, 8888端口。 实现代理到charies
