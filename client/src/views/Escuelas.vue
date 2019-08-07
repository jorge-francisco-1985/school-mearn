<template>
  <v-app class="transparent">
    <v-card class="elevation-0 transparent">
      <v-card-title primary-title class="transparent">
        <v-toolbar
              class="mb-2"
              flat
              color="transparent"
            >
              <v-layout row wrap>
                <v-flex xs11>
                  <v-toolbar-title class="transparent">
                
                    Escuelas 
                
                  </v-toolbar-title>
                  
                </v-flex>
                <v-flex xs1>
                  <v-dialog v-model="dialogNewEscuela" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="black"  icon dark v-on="on"><v-icon>add</v-icon></v-btn>
                    </template>
                    <v-card > 
                      <v-card-title >
                        <span class="headline">Agregar escuela</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout row wrap>
                            <v-flex xs12>
                              <v-text-field label="Clave de la escuela" v-model="editedItem.id_escuela"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Nombre*" required v-model="editedItem.nombre"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Direccion" v-model="editedItem.direccion"></v-text-field>
                            </v-flex>                            
                          </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialogNewEscuela = false">Cerrar</v-btn>
                        <v-btn color="blue darken-1" flat @click="insertarEsuela()">Guardar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>    
                </v-flex>
              </v-layout>
            
            </v-toolbar>
      </v-card-title>
      <v-card-text >
        <v-card style="min-height:80%">
          <v-card-text>
            <v-data-iterator
          :items="escuelas"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          content-tag="v-layout"
          hide-actions
          row
          wrap
          
        >
          
          <template  v-slot:item="props"  >
            <v-flex
              xs4
              sm6
              md4
              lg4
              class="white"
            >
              <v-card >
                <v-card-title  class=""><span class="subtitle-1">{{ props.item.nombre }}</span></v-card-title>

                <v-container grid-list-xs>
                  
                </v-container>

                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Clave de la escuela</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.id_escuela }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Direccion</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.direccion }}</v-list-tile-content>
                  </v-list-tile>

                </v-list>
                <!-- <v-card-actions right>
                  <v-btn color="success" dark icon @click="editar(props.item)"><v-icon>edit</v-icon></v-btn>
                  <v-btn color="warning" dark icon><v-icon>delete_forever</v-icon></v-btn>
                </v-card-actions> -->
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator> 
          </v-card-text>
        </v-card>
        
      </v-card-text>
    </v-card>       

  </v-app>
        
        
</template>

<script>
 import EscuelaService from '../services/EscuelasService';


 export default {
    data: () => ({
        dialogNewEscuela:false,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: -1
        },
        escuelas:[],
        error:'',
        headers:[
          {
            text: 'Clave Escuela',
            align: 'right',
            // sortable: false,
            value: 'id_escuela'
          },
          {
            text: 'Nombre del Centro',
            align: 'right',
            // sortable: false,
            value: 'nombre'
          },
          {
            text: 'Dirección',
            align: 'right',
            // sortable: false,
            value: 'direccion'
          },
          {
            text: 'Opciones',
            align: 'right',
            sortable: false,
            value: ''
          },
          
        ],
        text:'',
        editedIndex:-1,
        editedItem:{
          nombre:"",
          direccion:"",
          lat:0,
          lng:0,
          status:1
        },
        defaultItem:{
          nombre:"",
          direccion:"",
          lat:0,
          lng:0,
          status:1
        }
    }),
    async created(){
        try {
            let response=await EscuelaService.getEscuelas(this.$session.get("token"));
            if(response.code==1){
              this.escuelas=response.data;
              
              
            }
            console.log(response,this.$session.get("token"));
            this.$session.set("token",response.token);
            
        } catch (error) {
            this.error=error.message;
        }
    },
    methods: {
     async insertarEsuela () {
        let token=this.$session.get("token");
        
        let escuela=this.editedItem;
        if(this.editedIndex==-1){
          let res=await EscuelaService.insertEscuela({token,escuela});
          if(res.code==1){          
            this.escuelas.push(this.editedItem);
            this.cerrarDialog();
          
          }
            this.$session.set("token",res.token);
        }else{
          let res=await EscuelaService.editarEscuela({token,escuela});
          if(res.code==1){          
            this.escuelas[this.editedIndex]=this.editedItem;
            this.cerrarDialog();
           
          }
           this.$session.set("token",res.token);
        }
        
        
        
        
      },
      cerrarDialog(){
        this.editedItem=this.defaultItem;
        this.dialogNewEscuela=false;
      },
      editar(item){
        this.editedItem=Object.assign({},this.editedtItem,item);
        this.editedIndex=this.escuelas.indexOf(item);
        this.dialogNewEscuela=true;
      }
    }
  }
  
</script>
