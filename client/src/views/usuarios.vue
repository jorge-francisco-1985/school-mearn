<template>
      <v-data-table
        :headers="headers"
        :items="usuarios.data"
        min-height="1000px"
      >
      
        <template v-slot:items="props">
          <td>{{ props.item.user_name }}</td>
          <td class="text-xs-right">{{ props.item.id_escuela }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.nombre }}</td>
          <td class="text-xs-right">{{ props.item.paterno }}</td>
          <td class="text-xs-right">{{ props.item.materno }}</td>
        </template>
      </v-data-table>
</template>

<script>
 import UsuarioService from '../services/UsuariosService';

 export default {
    data: () => ({
        pagination: {
          sortBy: 'name'
        },
        usuarios:[],
        error:'',
        headers:[
          {
            text: 'Usuario',
            align: 'right',
            // sortable: false,
            value: 'uer_name'
          },
          {
            text: 'Escuela',
            align: 'right',
            // sortable: false,
            value: 'id_escuela'
          },
          {
            text: 'Correo electrónico',
            align: 'right',
            // sortable: false,
            value: 'email'
          },
          
          {
            text: 'Nombre',
            align: 'right',
            // sortable: false,
            value: 'nombre'
          },
          {
            text: 'Apellido Paterno',
            align: 'right',
            // sortable: false,
            value: 'paterno'
          },
          {
            text: 'Apellido Materno',
            align: 'right',
            // sortable: false,
            value: 'materno'
          },
        ],
        text:''
    }),
    async created(){
        try {
            this.usuarios=await UsuarioService.getUsuarios();
        } catch (error) {
            this.error=error.message;
        }
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
  
</script>
