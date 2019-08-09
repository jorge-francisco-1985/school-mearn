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
                     <v-btn color="black"  icon dark @click="dialogNewEscuela=true"><v-icon>add</v-icon></v-btn>
                </v-flex>
              </v-layout>
            
            </v-toolbar>
      </v-card-title>
      <v-card-text >
        <v-card  class="transparent elevation-0" >
          <v-card-text  >
            <v-container fluid grid-list-sm>
              <v-layout
                row
                wrap
              >
                <v-flex
                  v-for="escuela in escuelas"
                  :key="escuela.id_escuela"
                  xs4
                >
                  <v-card>
                    
                    <v-card-text>
                      <v-layout row wrap >
                        <v-flex xs4 >
                          <v-avatar
                            size="100"
                          
                          >
                            <img v-bind:src="escuela.logo!=null?store.state.serverHost+escuela.logo:require('./../assets/icon-forschools.png')" alt="" >
                          </v-avatar>
                        </v-flex>
                        <v-flex xs8>
                          <div class="title"><strong class=" "> Clave: </strong>{{escuela.id_escuela}}</div>
                            <div class="title"><strong class=" "> Esucuela: </strong>{{escuela.nombre}}</div>
                            <div class="subtitle"> {{escuela.direccion}} </div>
                        </v-flex>

                      </v-layout>
                    </v-card-text>
        
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon  color="indigo">
                        <v-icon>settings</v-icon>
                      </v-btn>
                      
        
                      <v-btn icon color="orange">
                        <v-icon >edit</v-icon>
                      </v-btn>
                      <v-btn icon color="red">
                        <v-icon>delete</v-icon>
                      </v-btn>
        
                      
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
        
      </v-card-text>
    </v-card>       
    <DialogNuevaEscuela :editedItem="editedItem" :dialogEscuela="dialogNewEscuela"></DialogNuevaEscuela>
  </v-app>
        
        
</template>

<script>
  import EscuelaService from '../services/EscuelasService';
  import DialogNuevaEscuela from './dialogs/nueva-escuela';

 export default {
   components:{
     DialogNuevaEscuela
   },
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
      },
      cargarArchivoIncidencia(e){
        var self=this;
        const files = e.target.files
        if(files[0]!==undefined) {
          
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.name = files[0].name;
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.type = files[0].type;
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.size=(files[0].size/1024).toFixed(2)+"  KB";
          if(self.menuOpt[6].modals.incidencias.editedItem.Archivo.name.lastIndexOf('.') <= 0) {
            
            return
          }
          const fr = new FileReader ()  
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            
            self.menuOpt[6].modals.incidencias.editedItem.Archivo.file = files[0] // this is an image file that can be sent to server...
            self.guardarArchivoIncidencia();
          })
          
        } else {
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.name = ''
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.file = ''
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.type = ''
          self.menuOpt[6].modals.incidencias.editedItem.Archivo.size="";
        }
      },
    }
  }
  
</script>
