<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      clipped
      app
      dark
      
      
    >
     <v-toolbar color="primary" height="110px">
      <span class="title ml-3 mr-5">School Admin</span>
       
       
     </v-toolbar>
      <v-list>
        <v-list-tile
          key="1"
          
        >
          <v-list-tile-action>
            <v-icon>supervised_user_circle</v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <router-link to="/usuarios">Usuarios</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer >
    <v-toolbar color="primary" dark app fixed clipped-left height="110px">
      <v-toolbar-side-icon  @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">School Admin</span>
      <v-text-field
        solo-inverted
        dark
        flat
        hide-details
        label="Buscar"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-menu
        v-model="menuUsuario"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        bottom
        class="transparent"
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
            <a href="#"
              v-on="on"
              dark
            >
              <v-avatar
                size="40"
              
              >
                <img v-bind:src="user.avatar!=null?store.state.serverHost+user.avatar:require('./assets/default-user-image.png')" alt="" >
              </v-avatar>
              <span class="body-1 white--text"> {{user.nombre+" "+user.paterno}} <v-icon>keyboard_arrow_down</v-icon> </span> 

            </a>
            
        </template>
  
        <v-card style="background:rgba(1,1,1,.7)">
          <v-list dark style="background:rgba(0,1,1,.0)">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img v-bind:src="user.avatar!=null?store.state.serverHost+user.avatar:require('./assets/default-user-image.png')" alt="asdsd" >
              </v-list-tile-avatar>
  
              <v-list-tile-content>
                <v-list-tile-title class="text-capitalize ">{{user.nombre+" "+user.paterno+" "+user.materno}}</v-list-tile-title>
                <!-- <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title> -->
              </v-list-tile-content>
  
              <v-list-tile-action>
                <!-- <v-btn
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
                >
                  <v-icon>favorite</v-icon>
                </v-btn> -->
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile @click="salir()" class="font-weight-regular font-italic">
  
              <v-list-tile-content>
                <v-list-tile-title ></v-list-tile-title>
                Cerrar Sesión
                
              </v-list-tile-content>
  
              <v-list-tile-action>
                
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
  
          <v-divider></v-divider>
  
          <!-- <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="message" color="purple"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Enable messages</v-list-tile-title>
            </v-list-tile>
  
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="hints" color="purple"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Enable hints</v-list-tile-title>
            </v-list-tile>
          </v-list> -->
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <!-- <v-btn flat @click="menu = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="menu = false">Save</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container >
        <v-card >
          <v-card-text>
            <router-view></router-view>
          </v-card-text>
        </v-card>
      </v-container>      
    </v-content>
  </v-app>
</template>

<script>
import { store } from './store'
  export default {
    data: () => ({
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
