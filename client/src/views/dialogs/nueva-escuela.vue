<template>
    <div>
        <v-dialog v-model="dialogEscuela" persistent max-width="500px">
        
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
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dialogEscuela = false">Cerrar</v-btn>
            <v-btn color="success darken-1" text  @click="insertarEsuela()">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> 
    </div>
</template>


<script>
 import EscuelaService from '../../services/EscuelasService';


 export default {
    props:[
        "editedItem",
        "dialogEscuela"
    ],
    data: () => ({
        // dialogEscuela:false
        dialogNewEscuela:false,
        // rowsPerPageItems: [4, 8, 12],
        // pagination: {
        //   rowsPerPage: -1
        // },
        // escuelas:[],
        // error:'',
        // headers:[
        //   {
        //     text: 'Clave Escuela',
        //     align: 'right',
        //     // sortable: false,
        //     value: 'id_escuela'
        //   },
        //   {
        //     text: 'Nombre del Centro',
        //     align: 'right',
        //     // sortable: false,
        //     value: 'nombre'
        //   },
        //   {
        //     text: 'Dirección',
        //     align: 'right',
        //     // sortable: false,
        //     value: 'direccion'
        //   },
        //   {
        //     text: 'Opciones',
        //     align: 'right',
        //     sortable: false,
        //     value: ''
        //   },
          
        // ],
        // text:'',
        // editedIndex:-1,
        // // editedItem:{
        // //   nombre:"",
        // //   direccion:"",
        // //   lat:0,
        // //   lng:0,
        // //   status:1
        // // },
        // defaultItem:{
        //   nombre:"",
        //   direccion:"",
        //   lat:0,
        //   lng:0,
        //   status:1
        // }
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
    },computed: {
        dialogNewEscuela:dialogEscuela
    },
  }
  
</script>
