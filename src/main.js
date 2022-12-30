import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import LocationPath from './components/LocationPath'
import Pagination from 'vue-pagination-2';

Vue.config.productionTip = false

Vue.use(Notifications)

Vue.component('LocationPath',LocationPath);
Vue.component('pagination', Pagination);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
