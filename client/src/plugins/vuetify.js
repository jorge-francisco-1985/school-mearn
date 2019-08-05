import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme:{
    primary: "#009688",
    secondary: "#2196f3",
    accent: "#3f51b5",
    error: "#e91e63",
    warning: "#ff5722",
    info: "#00bcd4",
    success: "#8bc34a"
  },
  iconfont: 'md',
})
