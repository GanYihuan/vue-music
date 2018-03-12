import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router/router'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'
import store from './store/store'

import './common/scss/index.scss'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  render: h => h(App)
})
