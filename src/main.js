import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store.js";

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

app.$mount("app");
