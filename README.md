# imooc-music

> Vue-开发移动端音乐 WebApp

## 内容大纲

![内容大纲](https://i.loli.net/2019/01/12/5c39f01b7e72b.jpeg)

## data

- [推荐界面数据](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)
- [歌手数据](https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=0025NhlN2yWrP4&jsonpCallback=__jp1)
- [歌单数据](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 2-2 Vue-cli 脚手架安装

## 2-3 项目目录介绍及图标字体、公共样式等资源准备

> ESLint webpack File changes must run `npm run start`
> Directory introduction

- api: (back-end request, jsonp request, ajax request)
- common: (Shared static resources: img, common js, style)
- components: (Common component)
- base: (Share component)
- router: (route)
- store: (Vuex data)
- main.js (entrance)

```console
npm install sass-loader node-sass stylus stylus-loader -D
```

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

## 3-2 路由配置 + tab 顶导组件开发

## 4-1 页面简介 + 轮播图数据分析

- (chrome) XHR: ajax request
- chrome check jsonp
- **static/jsonp1.png**
- jsonp data
- [推荐界面数据](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)

## 4-2 jsonp 原理介绍 + Promise 封装

## 4-3 jsonp 的应用 + 轮播图数据抓取

## 4-4 轮播图组件实现（上)

## 4-5, 4-6 轮播图组件实现

## 4-7 歌单数据接口分析

- Get song single data interface
- Status:500 server error
- keep-alive: Cache content after loading a route, And the cache is read at load time to prevent continuous loading

## 4-8 axios 介绍和后端接口代理

- **webpack.dev.conf.js**
- **recommend.js**

> back-end proxy, http request

cnpm i axios -S

- Modify host **config/index.js**

host: '0.0.0.0',

## 4-9 歌单列表组件开发和数据的应用

## 4-10 scroll 组件的抽象和应用（上）

## 4-11 scroll 组件的抽象和应用（下）

## 4-12 vue-lazyload 懒加载插件介绍和应用

## 4-13 loading 基础组件的开发和应用

## 5-1 歌手页面布局和设计讲解

- **singer.vue**(handle data)
- **listview.vue**(歌手界面)

## 5-2 歌手数据接口抓取

- **singer.js**
- **singer.vue**
- [歌手数据](https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0)

## 5-3 歌手数据处理和 Singer 类的封装

## 5-4 基础组件的开发和应用-滚动列表实现

## 5-5 listview 基础组件的开发和应用-右侧快速入口实现（1）

## 5-6 listview 基础组件的开发和应用-右侧快速入口实现（2）

- `_calculateHeight()`

## 5-7 listview 基础组件的开发和应用-右侧快速入口实现（3）(最难)

- scrollY()

## 5-8 listview 基础组件的开发和应用-右侧快速入口实现（4）

- `_scrollTo()`

## 5-9 listview 基础组件的开发和应用-滚动固定标题实现（上）

- fixedTitle()

## 5-10 listview 基础组件的开发和应用-滚动固定标题实现（下）

- diff()

## 6-1 歌手详情页布局和设计详解

## 6-2 子路由配置以及转场动画实现

- **route.js**(Secondary routing configuration)
- **singer.vue**(Route jump starting point)
- **singer-detail.vue**(歌手详情界面 handle data)
- **music-list.vue**(歌手详情界面)
- animate

## 6-3 初识 Vuex

- **static/vuex.png**
- introduce vuex

```console
npm i vuex -S
```

## 6-4 Vuex 初始化及歌手数据的配置

- **store/vuex.js**(vuex config)
- **store/state.js**(Defining data)
- **store/getters.js**(get vuex/state data)
- **store/mutation-types**(mutation operate name)
- **store/mutations.js**(handle vuex/state data)
- **store/action.js**(package mutation, async)
- **singer.vue**(save data to vuex/state)
- **singer-detail.vue**(get vuex/state data)

> 支持新语法, ...mapState(), **.babelrc** 配置

```console
npm i babel-preset-stage-1 -D
```

```json
"presets": [
  "stage-1"
],
```

## 6-5 歌手详情数据抓取

- **api/singer.js**(jsonp get data)
- **singer-detail.vue**(handle data)

## 6-6, 6-7 歌手详情数据处理和 Song 类的封装

- **common/js/song.js**(Song Class package)
- **singer-detail.vue**(Extract an object from the data, handle data)

## 6-8 music-list 组件开发（1）

- **singer-detail.vue**(handle data)
- **music-list.vue**(歌手详情界面)
- accept data

## 6-9 music-list 组件开发（2）

- **music-list.vue**(歌手详情界面)
- `this.$refs.list.$el.style.top`

```css
.bg-image {
  /* // w:h = 10:7 */
  position: relative;
  padding-top: 70%;
  width: 100%;
  height: 0;
  /* // w:h = 10:7 */
}
```

## 6-10 music-list 组件开发（3）

- **music-list.vue**(歌手详情界面)
- scrollY()

## 6-11, 6-12 music-list 组件开发（4）

- **music-list.vue**(歌手详情界面)
- scrollY()
- Create a slider mask effect

## 6-13 music-list 组件开发（6）

- **dom.js**
- **music-list.vue**(歌手详情界面)
- webkit prefix package

## 6-14 music-list 组件开发（7）

- **music-list.vue**(歌手详情界面)
- back btn
- loading

## 7-1 播放器页面设计详解

## 7-2 播放器 Vuex 数据设计

## 7-3 播放器 Vuex 的相关应用

## 7-4 播放器基础样式及歌曲数据的应用

- back()
- open()

## 7-5, 7-6, 7-7 播放器展开收起动画（中）

- use js create css animate

```console
npm i create-keyframe-animation -S
```

## 7-8 播放器歌曲播放功能实现

## 7-9, 7-10 播放器歌曲前进后退功能实现（上）

- prev()
- next()
- back()
- ready()
- error()

## 7-11 播放器播放时间获取和更新

## 7-12 播放器 progress-bar 进度条组件实现（上）

## 7-13, 7-14 播放器 progress-bar 进度条组件实现（中）

## 7-15 播放器 progress-circle 圆形进度条组件实现

- SVG

## 7-16 播放器模式切换功能实现（上）

## 7-17 播放器模式切换功能实现（中）

- shuffle()

## 7-18 播放器模式切换功能实现（下）

## 7-19 播放器歌词数据抓取

- **api/song.js**(back-end invoked)
- **webpack.dev.conf.js**(bypass the qq music restriction)
- **player.vue**
- reg

## 7-20 播放器歌词数据解析

- Base64 decoding and encoding
- getLyric()

## 7-21 播放器歌词滚动列表实现

- `handleLyric({ lineNum, txt })`

## 7-22, 7-23, 7-24 播放器歌词左右滑动实现（上）

- @touchstart.prevent="middleTouchStart"
- @touchmove.prevent="middleTouchMove"
- @touchend="middleTouchEnd"

## 7-25 播放器底部播放器适配+mixin 的应用

- **player.vue**
- **common/js/mixin.js**

## 8-1 歌单详情页布局介绍及 Vuex 实现路由数据通讯

- **recommend.vue**
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

## 9-3 榜单详情页布局介绍及 Vuex 实现路由数据通讯

- **rank.vue**(rank page)
- **top-list.vue**(handle data)

## 9-4 榜单详情页数据抓取和应用

- **top-list.vue**
- **api/rank.js**

## 9-5 带排行的 song-list 组件扩展和应用

- **top-list.vue**
- **song-list.vue**

## 10-1 搜索页面页面布局和功能介绍

## 10-2 搜索页面 search-box 组件开发

- **search.vue**
- **search-box.vue**

## 10-3 搜索页面热门搜索数据抓取和应用

- **api/search.js**
- **search-box.vue**
- **search.vue**

## 10-4 搜索页面 suggest 组件开发（1）

- **api/search.js**
- **suggest.vue**(search result)
- jsonp request

## 10-5 搜索页面 suggest 组件开发（2）

- **suggest.vue**(search result)

## 10-6, 10-7, 10-8, 10-9 搜索页面 suggest 组件开发（3）

- **store/action.js**
- **suggest.vue**(search result)
- selectItem()

## 10-10 搜索页面 suggest 组件开发（7）

- **suggest.vue**
- **no-result.vue**
- **common/js/util**
- Returns 404 when no search results are available.
- Optimization request: 节流功能，在处理搜索框输入字符时，搜索结果不是输入字符出来的结果，再输入一定时间请求。
- When you scroll, you lose focus, and the mobile input keyboard does not block the interface.

> 要节流函数所有不在 watch 里面写

```js
created() {
  // debounce(): **common/js/util.js** Throttling function
  // Throttling function, optimizing request.
  this.$watch(
    'query',
    debounce(newQuery => {
      this.$emit('query', newQuery)
    }, 200)
  )
},
```

## 10-11, 10-12, 10-13: 搜索页面搜索结果保存功能实现（1）

- **common/js/cache.js**
- **store/actions.js**

```console
npm install good-storage --save
```

- localStorage package
- storage.set(key, val)
- storage.get(key, def)
- storage.remove(key)
- sessionStorage 封装
- storage.session.set(key, val)
- storage.session.get(key, def)

## 10-14 搜索页面 search-list 组件功能实现（上）

- **search-list.vue**
- **search.vue**

## 10-15 搜索页面 search-list 组件功能实现（下）

- **common/js/cache.js**
- **search.vue**

## 10-16 搜索页面 confirm 组件功能实现

- **confirm.js**

## 10-17, 10-18 搜索页面剩余功能实现（上）

- **search.vue**

## 11-1 歌曲列表组件布局和功能介绍

- **playlist.vue**

## 11-2 歌曲列表组件显示和隐藏的控制

- **playlist.vue**
- **player.vue**
- prevent bubble

## 11-3, 11-4 歌曲列表组件播放列表的实现（1）

- **playlist.vue**
- `this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index],300)`

## 11-5, 11-6 歌曲列表组件播放列表的实现（3）

- **store/actions.js**
- **playlist.vue**

## 11-7 歌曲列表组件播放列表的实现（5）

- **playlist.vue**
- **confirm.vue**
- transition-group

## 11-8, 10-9 歌曲列表组件 playerMixin 的抽象（上）

- **common/js/mixin.js**

## 11-10 歌曲列表组件 add-song 组件实现（1）

- **add-song.vue**

## 11-11 歌曲列表组件 add-song 组件实现（2）

- **add-song.vue**
- **common/js/mixin.js**

## 11-12 歌曲列表组件 add-song 组件实现（3）

- **switches.vue**

## 11-13, 11-4 歌曲列表组件 add-song 组件实现（4）

- **add-song.vue**
- **common/js/cache.js**

## 11-15 歌曲列表组件 add-song 组件实现（6）

- **add-song.vue**
- **common/js/mixin.js**

## 11-16 歌曲列表组件 top-list 组件实现

- **top-tip.vue**

## 11-17 歌曲列表组件 scroll 组件能力的扩展

- **add-song.vue**

## 12-1

1. m-header 组件点击跳转到 user-center 组件
2. 用户中心页面 Switche 功能

## 12-2

1. 点击❤️收藏到缓存里面

## 12-3 用户中心页面收藏歌曲功能实现（上）processing

1. 点击❤️收藏到缓存里面

## 12-4 用户中心页面收藏歌曲功能实现（下）

1. 点击❤️收藏到缓存里面

## 12-5, 12-6 用户中心页面剩余功能实现（上）

- **user-center.vue**
- Back button function
- Random play button function
- Set height
- 404 interface

## 13-1 编译打包-播放内核小 bug 修复

- **player.vue**

## 13-2 编译打包-项目编译打包及 console 服务测试

- **prod.server.js** from dev.conf.js copy

```console
node prod.server.js
```

- chrome -> localhost:9000
- **config/index.js**

```js
build() {port: 9000}
```

- Compile the package, and the back-end call.

```console
npm run build
```

## 13-3 编译打包-路由组件实现懒加载

- **router/index.js**
- router Lazy load
- **router/route.js**
- **config/index.js**
- 指向本地服务器 CDN 地址, assetsPublicPath: '/',

## 13-4 编译打包-Vue.js 升级到最新版

- **package.json**
- vue upgrade, change package.json version
  > "vue" version and "vue-template-compiler" version equal

## 14 课程总结

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

- iphone 代理, 无线局域网, 配置代理, 代理 IP 手动, 电脑 IP, 8888 端口。 实现代理到 charies
- android 局域网, 修改网络, 配置 http 代理, 服务器电脑 IP, 8888 端口。 实现代理到 charies
