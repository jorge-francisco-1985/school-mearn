import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Login from './views/login.vue'
import router from './router'
import './session'
Vue.config.productionTip = false

new Vue({
  router,
  render: function(h){
    // this.$session.remove("token");
    if (this.$session.exists("token")){
        return h(App) 
      }else{
        return h(Login) 
      }
           
  }
}).$mount('#app')
