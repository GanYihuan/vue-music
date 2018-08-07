# imooc-music

## Vue-开发移动端音乐WebApp

## Build Setup

```console
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

- [推荐界面数据](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)
- [歌手数据](https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=0025NhlN2yWrP4&jsonpCallback=__jp1)
- [歌单数据](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 2-2 Vue-cli脚手架安装

```console
npm i -g vue-cli
vue init webpack imooc-music
```

- 'RunTime-only': Lighter
- vue-router: y
- ESLint: y
- Standard
- karma, e2e test: n
- npm install

```console
npm run start
```

## 2-3 项目目录介绍及图标字体、公共样式等资源准备

- ESLint webpack File changes must be renewed npm run start
- Directory introduction
1. api: (back-end request, jsonp request, ajax request)
2. common: (Shared static resources: img, common js, style)
3. components: (Common component)
4. base: (Share component)
5. router: (route)
6. store: (Vuex data)
7. main.js (entrance)

```console
npm i sass-loader console-sass stylus stylus-loader -D
```

- **eslintrc.js** Configuration
- **webpack.base.conf.js** Alias ​​configuration, 'common' correspond 'src/common'
> import 'common/scss/index.scss'

```js
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'common': resolve('src/common')
  }
}
```

## 3-1 页面入口 + header 组件的编写

- babel-runtime: es6 Escape
- babel-polyfill: es6 api Escape, mobile can use es6 api
- fastclick: Click 300MS delay on the mobile end

```console
npm i babel-polyfill babel-runtime fastclick vue-lazyload -S
```

## 3-2 路由配置 + tab 顶导组件开发

## 4-1 页面简介 + 轮播图数据分析

- (chrome) XHR: ajax request
- chrome check jsonp
- **static/jsonp1.png**
- jsonp data
- [推荐界面数据](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)

## 4-2 jsonp原理介绍 + Promise封装

- **common/js/jsonp.js**
- Promise:
> pass async message object
> an event which indicate that result will be know in the future
- jsonp(url, opts, fn)
> 动态创建script标签(没有同源限制可以跨域), script的src指向服务端地址, 有一个callback, 后端解析这个url, 带callback=a这个参数, 返回数据里调用a包裹一个方法, 在前端执行a这个方法, window注册这个方法, 定义这个a方法获得数据
- install jsonp

```console
npm i jsonp -S
```

## 4-3 jsonp的应用 + 轮播图数据抓取

- **api/config**
- **api/recommend.js**
- **recommend.vue**

## 4-4 轮播图组件实现（上)

- **recommend.vue**
- **slider.vue**
- **common/js/dom.js**
- Recommended interface: carousel component
- better-scroll

```console
npm i better-scroll@0.1.15 -S
```

## 4-5, 4-6 轮播图组件实现

- **slider.vue**

## 4-7 歌单数据接口分析

- **App.vue**
- **recommend.js**
- **recommend.vue**
- 获取歌曲单数据接口
- Status:500 服务器错误，主机问题。绕过界面约束

## 4-8 axios 介绍和后端接口代理

- **webpack.dev.conf.js**
- **recommend.js**

```console
npm i axios -S
```

- Modify host **config/index.js**

```js
host: '0.0.0.0',
```

## 4-9 歌单列表组件开发和数据的应用

## 4-10 scroll 组件的抽象和应用（上）

- **scroll.vue**

## 4-11 scroll 组件的抽象和应用（下）

- **recommend.vue**
- carousel render too late cause height wrong

## 4-12 vue-lazyload 懒加载插件介绍和应用

- **recommend.vue**
- **main.js**
- class="needsclick": fastclick 不要拦截点击过程
- image laz-load: reload depend on scroll

```console
npm i vue-lazyload -S
```

## 4-13 loading 基础组件的开发和应用

- **loading.vue**
- **recommend.vue**

## 5-1 歌手页面布局和设计讲解

- **singer.vue**(处理数据)
- **listview.vue**(歌手界面)

## 5-2 歌手数据接口抓取

- **singer.js**
- **singer.vue**
- [歌手数据](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 5-3 歌手数据处理和 Singer 类的封装

- **singer.js** (request data)
- **singer.vue** (Processing singer data)

## 5-4 基础组件的开发和应用-滚动列表实现

- **singer.vue** (Processing singer data)
- **listView.vue** (singer list)

## 5-5 listview 基础组件的开发和应用-右侧快速入口实现（1）

- **listView.vue**
- **scroll.vue**
- **common/dom.js** (get element index)

```html
<li
  class="item"
  v-for="(item, index) in shortcutList"
  :key="index"
  :class="{'current': currentIndex === index}"
  :data-index="index"
>
```

## 5-6 listview 基础组件的开发和应用-右侧快速入口实现（2）

- **scroll.vue**
- **listView.vue**
- _calculateHeight()

## 5-7 listview 基础组件的开发和应用-右侧快速入口实现（3）

- **scroll.vue**
- **listView.vue**
- scrollY()

## 5-8 listview 基础组件的开发和应用-右侧快速入口实现（4）

- **scroll.vue**
- **listView.vue**
- _scrollTo()

## 5-9 listview 基础组件的开发和应用-滚动固定标题实现（上）

- **listView.vue**
- fixedTitle()

## 5-10 listview 基础组件的开发和应用-滚动固定标题实现（下）

- ✨✨✨✨
- **listView.vue**
- **loading.vue**
- title向上顶一顶

## 6-1 歌手详情页布局和设计详解

- **singer.vue**(数据结构)
- **singer-detail.vue**(数据验证)
- **music-list.vue**(歌手界面)

## 6-2 子路由配置以及转场动画实现

- **route.js** 二级路由配置
- **singer.vue** 路由跳转
- **singer-detail.vue** animate 配置

## 6-3 初识 Vuex

- **static/vuex.png**
- introduce vuex

```console
npm i vuex -S
```

## 6-4 Vuex 初始化及歌手数据的配置

- **store/vuex.js** vuex config
- **store/state.js** 定义数据
- **store/getters.js** 取 vuex/state 的数据
- **store/mutation-types**: 操作 mutation 里面的方法的操作名称
- **store/mutations.js** 操作数据
- **store/action.js** 封装 mutation, 异步操作相关
- **singer.vue** 保存数据到 vuex/state
- **singer-detail.vue** 获取 vuex/state 数据

## 6-5 歌手详情数据抓取

- **api/singer.js** (jsonp 抓取数据)
- **singer-detail.vue** (获得抓取数据)

## 6-6, 6-7 歌手详情数据处理和Song类的封装

- **common/js/song.js** (Song 类的封装)
- **singer-detail.vue** (从数据里面抽取出一个对象)

## 6-8 music-list 组件开发（1）

- **top-list.vue** 传递数据到 **music-list.vue**

## 6-9 music-list 组件开发（2）

- **music-list.vue** 编写样式

## 6-10 music-list 组件开发（3）

- **music-list.vue** (创建滑块遮罩效果)

## 6-11 music-list 组件开发（4）

- **music-list.vue** (创建滑块遮罩效果)

## 6-12 music-list 组件开发（5）

- **music-list.vue** (创建滑块遮罩效果)

## 6-13 music-list 组件开发（6）

- **common/js/dom.js** (webkit前缀封装)
- **music-list.vue**

## 6-14 music-list 组件开发（7）

- **music-list.vue**
- back btn
- loading

## 7-1 播放器页面设计详解

- ✨

## 7-2 播放器Vuex数据设计

- ✨✨✨
- **store/state.js**

## 7-3 播放器Vuex的相关应用

- ✨✨✨✨
- **player.vue**
- **song-list.vue**
- **music-list.vue**
- **store/actions.js**

## 7-4 播放器基础样式及歌曲数据的应用

- ✨✨
- **player.vue*

## 7-5 播放器展开收起动画（上）

- ✨✨
- **player.vue**

## 7-6, 7-7 播放器展开收起动画（中）

- ✨✨✨✨
- **player.vue**
- 使用js创建css动画

```console
npm i create-keyframe-animation -S
```

## 7-8 播放器歌曲播放功能实现

- ✨✨✨
- **player.vue**

## 7-9, 7-10 播放器歌曲前进后退功能实现（上）

- ✨✨✨
- **player.vue**

## 7-11 播放器播放时间获取和更新

- ✨✨✨
- **player.vue**

## 7-12 播放器progress-bar进度条组件实现（上）

- ✨✨✨
- **progress-bar.vue**
- **player.vue**

## 7-13, 7-14 播放器progress-bar进度条组件实现（中）

- ✨✨✨
- **progress-bar.vue**
- **player.vue**

## 7-15 播放器progress-circle 圆形进度条组件实现

- ✨✨✨✨
- **progress-circle.vue**
- SVG

## 7-16 播放器模式切换功能实现（上）

- ✨✨✨
- **player.vue**
- **common/js/mixin.js**

## 7-17 播放器模式切换功能实现（中）

- ✨✨✨✨
- **player.vue**
- **common/js/util.js**
- **common/js/mixin.js**
- 洗牌函数

## 7-18 播放器模式切换功能实现（下）

- ✨✨✨✨
- **player.vue**
- **store/actions**

## 7-19 播放器歌词数据抓取

- ✨✨✨✨✨
- **api/song.js**: Front end call, foreground define proxy address for backstage.
- **webpack.dev.conf.js**: The back end bypasses the qq music restriction, and the output request content goes out, regular expression.
- **common/js/song.js**: The output after the front-end call.
- **player.vue**: The output content is used in the component.
- qq音乐播放歌曲界面 -> chrome network -> js fcg preview
- Click on the FCG to display the url in chrome.

## 7-20 播放器歌词数据解析

- ✨✨✨✨
- **player.vue**
- **common/js/song.js**
- Base64 decoding and encoding
- The lyric parsing, performs the callback function every time it is executed.

```console
npm i js-base64 -S
npm i lyric-parser
```

## 7-21 播放器歌词滚动列表实现

- ✨✨✨
- **player.vue**

## 7-22, 7-23 播放器歌词左右滑动实现（上）

- ✨✨✨
- **player.vue**

## 7-24 播放器歌词剩余功能实现

- ✨✨✨✨
- **player.vue**

## 7-25 播放器底部播放器适配+mixin的应用

- ✨✨✨✨
- **player.vue**
- **common/js/mixin.js**

## 8-1 歌单详情页布局介绍及Vuex实现路由数据通讯

- **route.js**
- **recommend.vue)**
- **recommend.js)**
- **mutations.js)**
- **getter.js)**
- **disc.vue**

## 8-2 歌单详情页数据抓取

- **disc.vue**
- **api/recommend.js**

## 8-3 歌单详情页数据的处理和应用

- **disc.vue**

## 9-1 排行页面布局介绍及排行榜数据抓取

- **rank.vue**

## 9-2 排行页排行榜数据应用

- **rank.vue**
- **loading.vue**

## 9-3 榜单详情页布局介绍及Vuex实现路由数据通讯

- **top-list.vue**

## 9-4 榜单详情页数据抓取和应用

- **top-list.vue**
- **api/rank.js**

## 9-5 带排行的song-list组件扩展和应用

- **top-list.vue**
- **song-list.vue**

## 10-1 搜索页面页面布局和功能介绍

- ✨

## 10-2 搜索页面search-box组件开发

- ✨✨
- **search.vue**
- **search-box.vue**

## 10-3 搜索页面热门搜索数据抓取和应用

- ✨✨✨
- **api/search.js**
- **search-box.vue**

## 10-4 搜索页面suggest组件开发（1）

- ✨✨✨
- **suggest.vue**
- **api/search.js**
- ES6
- jsonp request

## 10-5 搜索页面suggest组件开发（2）

- ✨✨✨
- **suggest.vue**
- **scroll.vue**
- **loading.vue**

## 10-6, 10-7, 10-8, 10-9 搜索页面suggest组件开发（3）

- ✨✨✨✨✨
- **store/action.js**
- **suggest.vue**

## 10-10 搜索页面suggest组件开发（7）

- ✨✨✨✨
- **suggest.vue**
- **no-result.vue**
- **common/js/util**
- Returns 404 when no search results are available.
- Optimization request: 节流功能，在处理搜索框输入字符时，搜索结果不是输入字符出来的结果，再输入一定时间请求。
- When you scroll, you lose focus, and the mobile input keyboard does not block the interface.

## 10-11, 10-12, 10-13: 搜索页面搜索结果保存功能实现（1）

- ✨✨✨✨✨
- **common/js/cache.js**
- **store/actions.js**

```console
npm install good-storage --save
```

- localStorage package
- storage.set(key, val)
- storage.get(key, def)
- storage.remove(key)
- sessionStorage封装
- storage.session.set(key, val)
- storage.session.get(key, def)

## 10-14 搜索页面search-list 组件功能实现（上）

- ✨✨
- **search-list.vue**
- **search.vue**

## 10-15 搜索页面search-list 组件功能实现（下）

- ✨✨✨✨
- **common/js/cache.js**
- **search.vue**

## 10-16 搜索页面confirm 组件功能实现

- ✨✨✨
- **confirm.js**

## 10-17, 10-18 搜索页面剩余功能实现（上）

- ✨✨✨
- **search.vue**

## 11-1 歌曲列表组件布局和功能介绍

- ✨
- **playlist.vue**

## 11-2 歌曲列表组件显示和隐藏的控制

- ✨✨
- **playlist.vue**
- **player.vue**
- prevent bubble

## 11-3, 11-4 歌曲列表组件播放列表的实现（1）

- ✨✨✨
- **playlist.vue**

## 11-5, 11-6 歌曲列表组件播放列表的实现（3）

- ✨✨✨✨
- **store/actions.js**
- **playlist.vue**

## 11-7 歌曲列表组件播放列表的实现（5）

- ✨✨✨
- **playlist.vue**
- **confirm.vue**
- transition-group

## 11-8, 10-9 歌曲列表组件 playerMixin的抽象（上）

- ✨✨
- **common/js/mixin.js**

## 11-10 歌曲列表组件add-song组件实现（1）

- ✨✨
- **add-song.vue**

## 11-11 歌曲列表组件add-song组件实现（2）

- ✨✨
- **add-song.vue**
- **common/js/mixin.js**

## 11-12 歌曲列表组件add-song组件实现（3）

- ✨✨
- **switches.vue**

## 11-13, 11-4 歌曲列表组件add-song组件实现（4）

- ✨✨✨✨
- **add-song.vue**
- **common/js/cache.js**

## 11-15 歌曲列表组件add-song组件实现（6）

- ✨✨✨
- **add-song.vue**
- **common/js/mixin.js**

## 11-16 歌曲列表组件top-list组件实现

- ✨✨
- **top-tip.vue**

## 11-17 歌曲列表组件scroll组件能力的扩展

- ✨✨
- **add-song.vue**

## 12-1, 12-2 用户中心页面收藏列表的Vuex数据设计和实现

- ✨✨
- **user-center.vue**
- **m-header.vue**
- Click ❤️ button to jump to the user center

## 12-3 用户中心页面收藏歌曲功能实现（上）processing

- ✨✨✨
- **user-center.vue**
- **common/js/mixin.js**

## 12-4 用户中心页面收藏歌曲功能实现（下）

- ✨✨✨
- **user-center.vue**
- **playlist.vue**

## 12-5, 12-6 用户中心页面剩余功能实现（上）

- ✨✨✨
- **user-center.vue**
- Back button function
- Random play button function
- Set height
- 404 interface

## 13-1 编译打包-播放内核小bug修复

- ✨✨✨✨
- **player.vue**

## 13-2 编译打包-项目编译打包及console服务测试

- ✨✨✨✨
- Compile the package, and the back-end call.

```console
npm run build
```

- **config/index.js**

```js
build(){port: 9000}
```

- **prod.server.js**
- from dev.conf.js copy

```console
console prod.server.js
```

- chrome -> localhost:9000

## 13-3 编译打包-路由组件实现懒加载

- ✨✨✨
- **router/index.js**
- router Lazy loading
- **router/route.js**
- **config/index.js**
- 指向本地服务器CDN地址, assetsPublicPath: '/',

## 13-4 编译打包-Vue.js升级到最新版

- ✨✨
- **package.json**
- vue upgrade, change package.json version
> "vue" version and "vue-template-compiler" version equal

## 14 课程总结

- ✨✨✨
- **main.js**
- Mobile terminal debugging, the interface has a green button vConsole.
- <https://github.com/Tencent/vConsole>

```console
cnpm install vconsole
```

- Caught tools charies(Mac) , Fiddler(Win)
> There is a default 8888 port.
- computer IP

```console
ifconfig
```

- iphone代理, 无线局域网, 配置代理, 代理IP手动, 电脑IP, 8888端口。 实现代理到charies
- android 局域网, 修改网络, 配置http代理, 服务器电脑IP, 8888端口。 实现代理到charies
