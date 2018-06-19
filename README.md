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
- 1. Modify host *(config/index.js)*
```shell
host: '0.0.0.0',
```
- 2. _/build/webpack.dev.conf.js_ back-end interface is defined asynchronously.
- 3. *(recommend.vue)* 'api/getDiscList' Call the backend interface.

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
- get element index *(common/dom.js)*
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

## 6-3 初识 Vuex

- ✨✨
- **static/vuex.png**

```shell
npm install vuex --save
```

## 6-4 Vuex 初始化及歌手数据的配置

- ✨✨✨✨
- **store/vuex.js** use vuex
- **store/state.js** defined data
- **store/getters.js** Mapping state data, get state
- **store/mutation-types**)*: The action name of the operation to modify the data.
- **store/mutations.js** Modify data operation
- **store/action.js** Mutation use action to encapsulate and modify multiple mutations.

```shell
  // call mutation，use mutation type constant。set state
  ...mapMutations({
    setSinger: 'SET_SINGER'
  })
  
  // getters, get (vuex/state.js) data
  ...mapGetters([
    'singer'
  ])
```

## 6-5 歌手详情数据抓取

- ✨✨
- **singer-detail.vue**
- **api/singer.js**

## 6-6, 6-7: 歌手详情页---handle data
- ✨✨✨✨
*(singer-detail.vue)*
*(common/js/song.js)*
##### song Class encapsulation


## 6-8: 歌手详情页---user data render interface
- ✨✨
*(music-list.vue)*
*(singer-detail.vue)*
##### singer-detail.vue handle data, music-list.vue show component


## 6-9: 歌手详情页---calculate size
- ✨✨
*(music-list.vue)*
*(song-list.vue)*


## 6-10, 6-11, 6-12: 歌手详情页---pull down & scroll to top animate
- ✨✨✨✨
*(song-list.vue)*
*(music-list.vue)* 


## 6-13: 歌手详情页---Configuration of different browser CSS, (just copy!)
- ✨✨✨✨
*(common/js/dom.js)*
*(music-list.vue)*


## 6-14: 歌手详情页---back button, loading
- ✨✨
*(music-list.vue)*


## 7-1: 音乐播放界面---introduce
- ✨


## 7-2: 音乐播放界面---Play vuex data define
- ✨✨✨✨
*(store/state.js)*


## 7-3: 音乐播放界面---vuex use
- ✨✨✨✨
*(player.vue)*
*(song-list.vue)*
*(music-list.vue)*
*(store/actions.js)*


## 7-4: 音乐播放界面---fullscreen button, vuex use
- ✨✨
*(player.vue)*


## 7-5: 音乐播放界面---animate css transition
- ✨✨
*(player.vue)*


## 7-6, 7-7: 音乐播放界面---animate js
- ✨✨✨✨
*(player.vue)*
```
npm install create-keyframe-animation --save
```


## 7-8: 音乐播放界面---Song control play button
- ✨✨✨
*(player.vue)*


## 7-9: 音乐播放界面---The song control moves forward and backwards, prevent limit clicks
- ✨✨✨
*(player.vue)*


## 7-10: 音乐播放界面---The song control prevents the limit click and the component grays
- ✨✨
*(player.vue)*


## 7-11: 音乐播放界面---Get the playtime
- ✨✨✨
*(player.vue)*


## 7-12: 音乐播放界面---The song control song progress bar grows with the song.
- ✨✨✨
*(progress-bar.vue)*
*(player.vue)*


## 7-13: 音乐播放界面---Song control song progress bar can be manually dragged.
- ✨✨✨
*(progress-bar.vue)*
*(player.vue)*


## 7-14: 音乐播放界面---The song control song progress bar can be played at a certain location.
- ✨✨
*(progress-bar.vue)*
*(player.vue)*


## 7-15: 音乐播放界面---Mini player ring progress bar (SVG)
- ✨✨✨✨
*(progress-circle.vue)*


## 7-16: 音乐播放界面---Song control playback mode style change.
- ✨✨✨
*(player.vue)*
*(common/js/mixin.js)*


## 7-17: 音乐播放界面---Various playback modes are handled.
- ✨✨✨✨
*(player.vue)*
*(common/js/util.js)*
*(common/js/mixin.js)*


## 7-18: 音乐播放界面---fix bug
- ✨✨✨✨
*(player.vue)*
*(store/actions)*


## 7-19: Grab the lyrics data
- ✨✨✨✨✨
1. *(api/song.js)* : Front end call, foreground define proxy address for backstage.
2. *(webpack.dev.conf.js)* : The back end bypasses the qq music restriction, and the output request content goes out, regular expression.
3. *(common/js/song.js)* : The output after the front-end call.
4. *(player.vue)* : The output content is used in the component.
##### qq音乐播放歌曲界面 -> chrome network -> js fcg preview
##### Click on the FCG to display the url in chrome.


## 7-20: Player lyrics data parsing.
- ✨✨✨✨
*(player.vue)*
*(common/js/song.js)*
##### Base64 decoding and encoding.
```
npm install js-base64 --save
```
##### The lyric parsing, performs the callback function every time it is executed.
```
npm install lyric-parser
```


## 7-21: 音乐播放界面---The lyrics scroll
- ✨✨✨
*(player.vue)*


## 7-22, 7-23: 音乐播放界面---Switch between the lyrics interface and the record interface.
- ✨✨✨
*(player.vue)*


## 7-24: 音乐播放界面---fix bug
- ✨✨✨✨
*(player.vue)*


## 7-25: 音乐播放界面---Set the correct location of the mini player.
- ✨✨✨✨
*(player.vue)*
*(common/js/mixin.js)*


## 8-1: 热门歌单---Vuex data
- ✨✨
*(route.js)*
*(recommend.vue)* 
*(recommend.js)* 
*(mutations.js)* 
*(getter.js)* 
*(disc.vue)*


## 8-2: 热门歌单---fetch data, fetch fail
- ✨✨
*(disc.vue)*
*(api/recommend.js)*


## 8-3: 热门歌单---Vuex use data
- ✨✨
*(disc.vue)*


## 9-1: 排行榜界面---fetch data
- ✨✨
*(rank.vue)*


## 9-2: 排行榜界面---Vuex use data
- ✨✨✨
*(rank.vue)*
*(loading.vue)*


## 9-3: 排行榜详情界面---Vuex Data communications
- ✨✨✨
*(top-list.vue)*


## 9-4: 排行榜详情界面---fetch data, use data
- ✨✨✨
*(top-list.vue)*
*(api/rank.js)*


## 9-5: 排行榜详情界面---Component extensions, top three trophy.
- ✨✨✨
*(top-list.vue)*
*(song-list.vue)*


## 10-1: 08-搜索界面---introduce
- ✨


## 10-2: 08-搜索界面---Search box component
- ✨✨
*(search.vue)* 
*(search-box.vue)*


## 10-3: 08-搜索界面---fetch data
- ✨✨✨
*(api/search.js)*
*(search-box.vue)*


## 10-4: 08-搜索界面--The search function
- ✨✨✨
*(suggest.vue)* 
*(api/search.js)*
1. ES6
2. jsonp request


## 10-5: 08-搜索界面---drop-down refresh
- ✨✨✨
*(suggest.vue)*
*(scroll.vue)*
*(loading.vue)*

 
## 10-6, 10-7, 10-8, 10-9: 08-搜索界面---Click the song on the search interface and insert it into the playlist.
- ✨✨✨✨✨
*(store/action.js)*
*(suggest.vue)*


## 10-10: 08-搜索界面---optimize
- ✨✨✨✨
*(suggest.vue)* 
*(no-result.vue)*
*(common/js/util)*
1. Returns 404 when no search results are available.
2. Optimization request: throttling function, when processing search box input character, 
  search result is not input a character to come out result, enter a certain time to request again.
3. When you scroll, you lose focus, and the mobile input keyboard does not block the interface.


## 10-11: 08-搜索界面---Search historical data cache to localStorage, vuex data storage.
- ✨✨
*(search.vue)*


## 10-12: 08-搜索界面---Search historical data cache to localStorage
- ✨✨✨✨
*(common/js/cache.js)*
*(store/actions.js)*
```
npm install good-storage --save
```
1. localStorage package: 
storage.set(key, val)
storage.get(key, def)
storage.remove(key)
2. sessionStorage封装: 
storage.session.set(key, val)
storage.session.get(key, def)


## 10-13: 08-搜索界面---read Search historical data from cache localStorage
- ✨✨
*(common/js/cache.js)*


## 10-14: 08-搜索界面---Search historical vuex render data
- ✨✨
*(search-list.vue)* 
*(search.vue)* 


## 10-15: 08-搜索界面---Search historical saveSearchHistory, deleteSearchHistory
- ✨✨✨✨
*(common/js/cache.js)*
*(search.vue)* 


## 10-16: 08-搜索界面---confirm component
- ✨✨✨
*(confirm.js)*


## 10-17: 08-搜索界面---scroll setting
- ✨✨✨
*(search.vue)*


## 10-18: 08-搜索界面---set mini Play position
- ✨✨
*(search.vue)*


## 11-1: 10-mini歌曲列表---introduce
- ✨
*(playlist.vue)*


## 11-2: 10-mini歌曲列表---show and hide
- ✨✨
*(playlist.vue)*
*(player.vue)*
1. prevent bubble


## 11-3: 10-mini歌曲列表---vuex data render
- ✨✨✨
*(playlist.vue)*


## 11-4: 10-mini歌曲列表---Scroll to the current location of the song.
- ✨✨✨
*(playlist.vue)*


## 11-5, 11-6: 10-mini歌曲列表---Delete a song
- ✨✨✨✨
*(store/actions.js)*
*(playlist.vue)*


## 11-7: 10-mini歌曲列表---Delete the animation of a song.
- ✨✨✨
*(playlist.vue)*
*(confirm.vue)*
1. transition-group


## 11-8, 11-9: 10-mini歌曲列表---Mixins public js
- ✨✨
*(common/js/mixin.js)*


## 11-10: 10-mini歌曲列表---'添加歌曲到列表' show & hide
- ✨✨
*(add-song.vue)*


## 11-11: 10-mini歌曲列表/添加歌曲到列表---Click the search results song to save the song to localStorage.
- ✨✨✨
*(add-song.vue)*
*(common/js/mixin.js)*


## 11-12: 10-mini歌曲列表/添加歌曲到列表---Switch the two buttons of the song list component.
- ✨✨
*(switches.vue)*


## 11-13, 11-14: 10-mini歌曲列表/添加歌曲到列表---playlist
- ✨✨✨✨✨
*(add-song.vue)*
*(common/js/cache.js)*


## 11-15: 10-mini歌曲列表/添加歌曲到列表---Search history
- ✨✨✨
*(add-song.vue)*
*(common/js/mixin.js)*


## 11-16: 10-mini歌曲列表/添加歌曲到列表---At the top of the tip
- ✨✨
*(top-tip.vue)*


## 11-17: 10-mini歌曲列表/添加歌曲到列表---fix-bug
- ✨✨
*(add-song.vue)*


## 12-1: 12-用户中心页---switch '我喜欢的' '最近听的'
- ✨✨
*(user-center.vue)*
*(m-header.vue)*
1. Click ❤️button to jump to the user center


## 12-2: 12-用户中心页---vuex Data communications
- ✨✨✨✨
*(store/actions.js)* 
*(common/js/cache.js)*


## 12-3: 12-用户中心页---Collection function processing
- ✨✨✨
*(user-center.vue)*
*(common/js/mixin.js)*


## 12-4: 12-用户中心页---Add a song to the list.
- ✨✨✨
*(user-center.vue)*
*(playlist.vue)*


## 12-5: 12-用户中心页---Random broadcast
- ✨✨✨
*(user-center.vue)*
1. Back button function.
2. Random play button function.


## 12-6: 12-用户中心页---Set height, 404 interface.
- ✨✨✨
*(user-center.vue)*
1. Set height
2. 404 interface


## 13-1: fix-bug
- ✨✨✨✨
*(player.vue)*


## 13-2: Compile the package
- ✨✨✨✨
1. Compile the package, and the back-end call.
```
npm run build
```
2. *(config/index.js)*
```
build(){port: 9000}
```
3. *(prod.server.js)*
##### from dev.conf.js copy
```
node prod.server.js
```
##### chrome -> localhost:9000


## 13-3: optimize
- ✨✨✨
*(router/index.js)*
1. router Lazy loading
*(router/route.js)*


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
