import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './views/login.vue'
import vuetify from './plugins/vuetify';
import './session'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    // this.$session.remove("token");
    if (this.$session.exists("token")) {
      return h(App)
    } else {
      return h(Login)
    }

  }
}).$mount('#app')
