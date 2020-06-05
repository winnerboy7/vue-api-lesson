import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

import AppLayout from './layouts/AppLayout'
import SimpleLayout from './layouts/SimpleLayout'
import OriLayout from './layouts/OriLayout'

Vue.component('app-layout', AppLayout)
Vue.component('simple-layout', SimpleLayout)
Vue.component('ori-layout', OriLayout)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
