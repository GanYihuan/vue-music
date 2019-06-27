import 'babel-polyfill'
import Vue from 'vue'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router/route'
import store from './store/vuex'
import 'common/scss/index.scss'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole' //  Mobile debugging tools
// console.log('test')

fastclick.attach(document.body) // fastclick: mobile-end click 300MS delay
Vue.config.productionTip = false // close Vue production tip

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
