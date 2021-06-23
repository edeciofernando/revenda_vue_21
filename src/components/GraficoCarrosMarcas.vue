<template>
 <div class="container">
   <h2>Gráfico Relacionando Nº de Veículos por Marca</h2>
     <GChart
       type="PieChart"
       :data="carrosMarcas"
    />
 </div>   
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from 'axios'
 
export default {
  components: {
    GChart
  },

  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      carrosMarcas: [["Marca", "Nº Veículos"]],
    }
  }, 
  mounted() {
    axios.get(this.$urlAPI + "/marcas_carros")
         .then(response => {
           const marcas = response.data;
//           console.log(marcas)
           marcas.forEach(marca => {
             this.carrosMarcas.push([marca.nome, marca.num])             
           });
         })
  }
}
</script>

<style scoped>

</style>
