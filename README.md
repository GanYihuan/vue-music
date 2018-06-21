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
[](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)
[](https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=0025NhlN2yWrP4&jsonpCallback=__jp1)
[](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 2-2 Vue-cli脚手架安装

- ✨
- install
```shell
npm install -g vue-cli
vue init webpack imooc-music
```
- 'RunTime-only':  More light
- vue-router 'Y': vue router
- ESLint 'Y': ES6 style code checker.
- Standard
- karma, e2e test 'N':
- npm install
```shell
npm run dev
```

## 2-3 项目目录介绍及图标字体、公共样式等资源准备

- ✨✨
- **build/webpack.base.config**
- dialog introduce
1. api: (Back-end request, jsonp request, AJAX request.)
2. common: (Shared static resources: img, common js, style)
3. components: (Common component)
4. base: (Share component)
5. router: (route)
6. store: (Vuex data)
7. main.js (entrance)
- npm install
```shell
"sass-loader": "^6.0.7",
"node-sass": "^4.7.2",
"stylus": "^0.54.5",
"stylus-loader": "^2.1.1",
```
- eslintrc.js
- **webpack.base.conf.js** alias config
> import 'common/scss/index.scss'
```shell
context: path.resolve(__dirname, '..', dir),
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
```

## 3-1: entrance, header component

- ✨✨
- **App.vue**
- **main.js**
- **build/webpack.base.config**
- **components/m-header.vue**
- 1. babel-runtime: es6 escape
- 2. fastclick: Click 300MS delay on the mobile end.
- 3. babel-polyfill: es6 api escape, mobile can use that api
```shell
npm install babel-runtime --save
cnpm install fastclick --save
cnpm install babel-polyfill --save-dev
```
- **build/webpack.base.config**
> Alias configuration, abbreviated application file path.

## 3-1 页面入口+header 组件的编写

- ✨✨
- **tab.vue**
- **App.vue**
- **route.vue**

## 3-2 路由配置+ tab 顶导组件开发

## 4-1 页面简介+轮播图数据分析

- ✨✨
- XHR: ajax request
- chrome check jsonp
- **static/jsonp1.png**
- jsonp data
- [qq](https://m.y.qq.com/)
- [qq](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)

## 4-2 jsonp原理介绍+Promise封装

- ✨✨✨✨
- **common/js/jsonp.js**
- Promise:
> pass async message object
> an event which indicate that result will be know in the future
- jsonp:
> Solve cross-domain issues.
> Dynamically creating a script tag with no same-origin restriction, it can be cross-domain,
> And the script SRC address points to the third-party API url.
> A callback function is provided to receive data, while a third party generates a wrapper for the json data.
> The browser calls the callback function and passes the parsed json object as a parameter.
> This site script can handle incoming data from the callback function.
- install jsonp
```shell
npm install jsonp --save
```

## 4-3 jsonp的应用+轮播图数据抓取

- ✨✨✨
- **api/config**
- **api/recommend.js**
- **recommend.vue**

## 4-4 轮播图组件实现（上)

- ✨✨✨✨
- **recommend.vue**
- **slider.vue**
- **common/js/dom.js**
- 推荐界面: carousel component
- better-scroll
```shell
cnpm install better-scroll@0.1.15 --save
```
- v-if="recommends.length": Prevent async loading slow

## 4-5 轮播图组件实现（中)

- ✨✨✨✨
- **slider.vue**

## 4-6 轮播图组件实现（下)

- ✨✨
- **slider.vue**

## 4-7 歌单数据接口分析

- ✨✨
- **App.vue**
- **recommend.js**
- **recommend.vue**

- Grab the song single data interface
- 500 server error, host problem. Bypass interface constraint

## 4-8 axios 介绍和后端接口代理

- ✨✨✨✨
- axios, Start HTTPRequest, modify headers.

```shell
cnpm install axios --save
```

- Modify host *(config/index.js)*

```shell
host: '0.0.0.0',
```

- _/build/webpack.dev.conf.js_ back-end interface is defined asynchronously.
- **recommend.vue** 'api/getDiscList' Call the backend interface.

## 4-9 歌单列表组件开发和数据的应用

- ✨✨
- **recommend.vue**

## 4-10 scroll 组件的抽象和应用（上）

- ✨✨✨
- **scroll.vue**
- [official document](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)

## 4-11 scroll 组件的抽象和应用（下）

- ✨✨✨
- **recommend.vue**

## 4-12 vue-lazyload 懒加载插件介绍和应用

- ✨✨
- **recommend.vue**
- **main.js**
- image laz-load: reload depend on scroll

```shell
npm install vue-lazyload --save
```

- class="needsclick" : fastclick Do not intercept the click process.

## 4-13 loading 基础组件的开发和应用

- ✨✨
- **loading.vue**
- **recommend.vue**

## 5-1 歌手页面布局和设计讲解

- ✨

## 5-2 歌手数据接口抓取

- ✨✨
- **api/singer.js**
- **singer.vue**
- [singer data](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 5-3 歌手数据处理和 Singer 类的封装

- ✨✨✨✨
- **singer.vue**
- **common/js/singer.js**
- [singer data](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 5-4 listview 基础组件的开发和应用-滚动列表实现

- ✨✨
- **listView.vue** singer list
- **singer.vue** handle data

## 5-5 listview 基础组件的开发和应用-右侧快速入口实现（1）

- ✨✨✨✨
- **listView.vue**
- **scroll.vue**
- **common/dom.js**
- get element index **common/dom.js**

```shell
<li
  class="item"
  v-for="(item, index) in shortcutList"
  :key="index"
  :class="{'current': currentIndex === index}"
  :data-index="index"
>
```

## 5-6 listview 基础组件的开发和应用-右侧快速入口实现（2）

- ✨✨✨✨
- **listView.vue**
- **scroll.vue**

## 5-7 listview 基础组件的开发和应用-右侧快速入口实现（3）

- ✨✨✨✨
- **listView.vue**
- **scroll.vue**

## 5-8 listview 基础组件的开发和应用-右侧快速入口实现（4）

- ✨✨✨✨
- **listView.vue**
- **scroll.vue**

## 5-9 listview 基础组件的开发和应用-滚动固定标题实现（上）

- ✨✨✨
- **listView.vue**

## 5-10 listview 基础组件的开发和应用-滚动固定标题实现（下）

- ✨✨✨✨
- **listView.vue**
- **loading.vue**

## 6-1 歌手详情页布局和设计详解

- ✨

## 6-2 子路由配置以及转场动画实现

- ✨✨
- **route.js**
- **listView.vue**
- **singer.vue**
- **singer-detail.vue**
- route config
- animate css

## 6-3 初识 Vuex

- ✨✨
- **static/vuex.png**
- api introduce vuex

```shell
npm install vuex --save
```

## 6-4 Vuex 初始化及歌手数据的配置

- ✨✨✨✨
- **store/vuex.js** vuex config
- **store/state.js** data
- **store/getters.js** 给外部用来取vuex里面的数据
- **store/mutation-types**: 操作mutation里面的方法的操作名称
- **store/mutations.js** modify data operation
- **store/action.js** 封装mutation, 异步操作相关
- **singer.vue** use vuex, save data into vuex
- **singer-detail.vue** use vuex, get data from vuex

## 6-5 歌手详情数据抓取

- ✨✨
- **singer-detail.vue**
- **api/singer.js**

## 6-6 歌手详情数据处理和Song类的封装（上）

- ✨✨✨✨
- **singer-detail.vue**
- **common/js/song.js**
- song Class encapsulation

## 6-7 歌手详情数据处理和Song类的封装（下）

- ✨✨✨✨
- **singer-detail.vue**
- **common/js/song.js**
- song Class encapsulation

## 6-8 music-list 组件开发（1）

- ✨✨
- **music-list.vue**
- **singer-detail.vue**
- singer-detail.vue handle data, music-list.vue show component

## 6-9 music-list 组件开发（2）

- ✨✨
- **music-list.vue**
- **song-list.vue**

## 6-10 music-list 组件开发（3）

- ✨✨✨✨
- **song-list.vue**
- **music-list.vue**
- 创建滑块遮罩

## 6-11 music-list 组件开发（4）

- ✨✨✨✨
- **song-list.vue**
- **music-list.vue**
- 滑块遮罩只运动到某个位置

## 6-12 music-list 组件开发（5）

- ✨✨✨✨
- **song-list.vue**
- **music-list.vue**
- 滑块遮罩运动, 歌手图片变化

## 6-13 music-list 组件开发（6）

- ✨✨✨✨
- **common/js/dom.js**
- **music-list.vue**
- webkit前缀封装

## 6-14 music-list 组件开发（7）

- ✨✨
- **music-list.vue**
- back btn
- loading

## 7-1 播放器页面设计详解

- ✨

## 7-2 播放器Vuex数据设计

- ✨✨✨✨
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

```shell
npm install create-keyframe-animation --save
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

```shell
npm install js-base64 --save
npm install lyric-parser
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

- ✨✨
- **route.js**
- **recommend.vue)**
- **recommend.js)**
- **mutations.js)**
- **getter.js)**
- **disc.vue**

## 8-2 歌单详情页数据抓取

- ✨✨
- **disc.vue**
- **api/recommend.js**

## 8-3 歌单详情页数据的处理和应用

- ✨✨
- **disc.vue**

## 9-1 排行页面布局介绍及排行榜数据抓取

- ✨✨
- **rank.vue**

## 9-2 排行页排行榜数据应用

- ✨✨✨
- **rank.vue**
- **loading.vue**

## 9-3 榜单详情页布局介绍及Vuex实现路由数据通讯

- ✨✨✨
- **top-list.vue**

## 9-4 榜单详情页数据抓取和应用

- ✨✨✨
- **top-list.vue**
- **api/rank.js**

## 9-5 带排行的song-list组件扩展和应用

- ✨✨✨
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

```shell
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

## 13-2 编译打包-项目编译打包及node服务测试

- ✨✨✨✨
- Compile the package, and the back-end call.

```shell
npm run build
```

- **config/index.js**

```js
build(){port: 9000}
```

- **prod.server.js**
- from dev.conf.js copy

```shell
node prod.server.js
```

- chrome -> localhost:9000

## 13-3 编译打包-路由组件实现懒加载

- ✨✨✨
- **router/index.js**
- router Lazy loading
- **router/route.js**
- **config/index.js**
- 指向本地服务器CDN地址, assetsPublicPath: '/',

## 13-4: vue upgrade
- ✨✨
*(package.json)*
1. vue upgrade, change package.json version
> "vue" version and "vue-template-compiler" version equal


## 14-1: Course extension
- ✨✨✨
*(main.js)*
1. Mobile terminal debugging, the interface has a green button vConsole.
<https://github.com/Tencent/vConsole>
```
cnpm install vconsole
```
2. Caught tools charies(Mac) , Fiddler(Win)
> There is a default 8888 port.
3. computer IP
```
ifconfig
```
4. iphone代理, 无线局域网, 配置代理, 代理IP手动, 电脑IP, 8888端口。 实现代理到charies
5. android 局域网, 修改网络, 配置http代理, 服务器电脑IP, 8888端口。 实现代理到charies
