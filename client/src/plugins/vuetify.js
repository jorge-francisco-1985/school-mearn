import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#01579B",
        secondary: "#006064",
        accent: "#3f51b5",
        error: "#e91e63",
        warning: "#ff5722",
        info: "#00bcd4",
        success: "#8bc34a"
      },
    },
  },
})
