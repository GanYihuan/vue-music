import 'babel-polyfill'
import Vue from 'vue'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router/route'
import store from './store/vuex'

import 'common/scss/index.scss'

/* Mobile debugging tools. */
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
// console.log('test')

/* fastclick: mobile end Clicks 300MS Delay */
fastclick.attach(document.body)
Vue.config.productionTip = false

/* VueLazyload */
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
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
