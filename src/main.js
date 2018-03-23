import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'
import store from './store/index'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

import './common/scss/index.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  render: h => h(App)
})
