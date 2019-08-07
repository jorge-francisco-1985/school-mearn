<template>

<v-app>
    <v-layout align-center justify-center >
      <v-flex xs12 sm8 md4>
       


        <v-card class="elevation-12" max-width="500">
          
          <v-toolbar
            color="primary"
            dark
            tabs
          >            
            <template v-slot:extension>
              <v-tabs
                v-model="model"
                centered
                color="primary"
                slider-color="red"
                active-class="secondary"
              >
                <v-tab
                  href="#login"
                >
                <v-icon>lock</v-icon>
                  Login
                  
                  
                </v-tab>
                <v-tab
                  href="#signin"
                >
                <v-icon>person_add</v-icon>
                  Registro
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="model">
            <v-tab-item
              value="login"
            >
              <v-card flat >
                <v-card-text >
                  <v-form @submit.prevent="login" id="login-form">
                    <v-text-field v-model="editedItem.user_name" prepend-icon="how_to_reg"  label="Nombre de usuario" type="text"></v-text-field>
                    <v-text-field v-model="editedItem.pass" prepend-icon="lock"  label="Contraseña" type="password"></v-text-field>
                    <v-spacer></v-spacer>
                    
                  </v-form>
                  <strong class="red--text">{{errorMessage}}</strong>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- -> Ficha para registrar usuarios  -->
            <v-tab-item
              value="signin"
            >
            
              <v-card flat>
                <v-card-text>
                  <v-container grid-list-xs>
                      <v-form @submit.prevent="signin" id="signin-form">
                        <v-text-field v-model="editedItem.user_name" prepend-icon="how_to_reg"  label="Nombre de usuario" type="text"></v-text-field>
                        <v-text-field v-model="editedItem.pass" prepend-icon="lock"  label="Contraseña" type="password"></v-text-field>
                        <v-text-field v-model="editedItem.repass" prepend-icon="lock"  label="Repetir contraseña" type="password"></v-text-field>
                        <v-text-field v-model="editedItem.email" prepend-icon="alternate_email"  label="Correo Electrónico" type="text"></v-text-field>
                        <v-text-field v-model="editedItem.nombre" prepend-icon="person"  label="Nombre" type="text"></v-text-field>
                        <v-text-field v-model="editedItem.paterno" prepend-icon="person"  label="Apellido Paterno" type="text"></v-text-field>
                        <v-text-field v-model="editedItem.materno" prepend-icon="person"  label="Apellido Materno" type="text"></v-text-field>
                        
                        <v-text-field v-model="editedItem.edad" prepend-icon="timer"  label="Edad" type="text"></v-text-field>

                        
                        
                      </v-form>
                  </v-container>
                  

                </v-card-text>
              </v-card>
            </v-tab-item>
            <!--  Ficha para registrar usuarios<-  -->
          </v-tabs-items>
          
          <v-card-actions >
            
            <v-btn v-show="model=='login'" color="primary" type="submit" form="login-form"   >Iniciar Sesión</v-btn>
            <v-btn v-show="model=='signin'" color="primary" type="submit" form="signin-form"   >Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>  
    <!-- {{datos}} -->
    
</v-app>
  
</template>
<script>
import UsuarioService from '../services/UsuariosService';
export default {
  data:() => ({
    datos:"",
    error:"",
    errorMessage:"",
    model: 'login',    
    editedItem:{
      user_name:"",
      pass:"",
      repass:"",
      email:"",
      nombre:"",
      paterno:"",
      materno:"",
      edad:""
    },
    defaultItem:{
      user_name:"",
      pass:"",
      repass:"",
      email:"",
      nombre:"",
      paterno:"",
      materno:"",
      edad:""
    }
  }),
  methods: {
    login () {
      var self=this;
      UsuarioService.loginUser(self.editedItem).then(function(datos){
        console.log(datos);
        if(datos.code==1){
          self.$session.set("token",datos.token);
          self.$session.set("userData",datos.user_data);
          location.href="/";
        }else{
          self.errorMessage=datos.message;
        }
        
      }).catch(function(error){
        if (error)
          self.$session.remove("userData");
      })
      
      
    },
    signin () {
      var self=this;
      delete self.editedItem.repass;
      UsuarioService.insertUser(self.editedItem).then(function(response){
      self.datos=response;
        if(self.datos.code==1){
          self.model="login";
        }
        
      }).catch(function(error){
        if (error)
          self.$session.remove("userData");
          self.error=error;
      })
      
      
    }

  },
  created:function(){
    
  }
}
</script>