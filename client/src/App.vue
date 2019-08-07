<template>
  <v-app id="inspire">
    <v-card
      
      style="height:100%"
    >
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  
      <v-app-bar
        color="primary"
        dark
      >
      <v-toolbar-title><span class="title ml-3 mr-5">School Admin</span></v-toolbar-title>
  
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
        
        <v-spacer></v-spacer>
  
        <v-menu bottom left >
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
            >
              <v-avatar
                size="40"
              
              >
                <img v-bind:src="user.avatar!=null?store.state.serverHost+user.avatar:require('./assets/default-user-image.png')" alt="" >
              </v-avatar>
              <!-- <v-icon>more_vert</v-icon> -->
            </v-btn>
          </template >
          <v-card style="background:rgba(1,1,1,.7)">
          <v-list dark style="background:rgba(0,1,1,.0)">
            <v-list-item>
              <v-list-item-avatar>
                <img v-bind:src="user.avatar!=null?store.state.serverHost+user.avatar:require('./assets/default-user-image.png')" alt="asdsd" >
              </v-list-item-avatar>
            </v-list-item>
  
            <v-list-item
              two-line
            >
              <v-list-item-content>
                <v-list-item-title class="title text-capitalize">{{user.nombre+" "+user.paterno+" "+user.materno}}</v-list-item-title>
                <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
              </v-list-item-content>
              
            </v-list-item>
          </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <template v-slot:prepend>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>
  
            <v-list-item
              link
              two-line
            >
              <v-list-item-content>
                <v-list-item-title class="title">Sandra Adams</v-list-item-title>
                <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </template>
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-action>
                  <v-icon>supervised_user_circle</v-icon>
                  
                </v-list-item-action>
              <v-list-item-title><router-link to="/usuarios">Usuarios</router-link></v-list-item-title>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-action>
                  <v-icon>home</v-icon>
                  
                </v-list-item-action>
              <v-list-item-title><router-link to="/Escuelas">Escuelas</router-link></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      
  
      <v-card-text class="grey lighten-2">
        <transition name="slide-y-transition">
            <router-view>

            </router-view>
        </transition>
      </v-card-text>
    </v-card>
  </v-app>
</template>



<script>
import { store } from './store'
  export default {
    data: () => ({
      group: null,
      store,
      dark: true,
      user:{},
      menuUsuario:false,
      fav:true,
      drawer: false,
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      footer: {
        inset: false
      }
    }),
    methods:{
      salir(){
        this.$session.remove("token");
        location.href="/";
      }
    },
    created:function(){
      this.user=this.$session.get("userData");
      
    }
  }
</script>
