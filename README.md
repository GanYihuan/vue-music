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
