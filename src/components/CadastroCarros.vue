<template>
  <div class="container mt-4">
    <h2>
      Cadastro de Veículos
      <router-link to="/formcarros" class="btn btn-danger float-right ml-3">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
      <form class="form-inline float-right">
        <input class="form-control form-control mr-1" type="text" v-model="filtro" @keyup="pesquisar"
               placeholder="Pesquisa">
        <button class="btn btn-success" @click.prevent="listar">Todos</button>
      </form>
    </h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Modelo</th>
          <th>Marca</th>
          <th>Ano</th>
          <th>Destaque</th>
          <th>Preço R$</th>
          <th>Foto</th>
          <th>Ações</th>
        </tr>
        <tr v-for="carro in carros" :key="carro.id">
          <td>{{ carro.modelo }}</td>
          <td>{{ carro.marca }}</td>
          <td class="text-center">{{ carro.ano }}</td>
          <td class="text-center text-danger font-weight-bold">{{ carro.destaque | destacaCarro }}</td>
          <td class="text-right">{{ carro.preco | estiloMoeda }}</td>
          <td class="text-center">
            <img :src="carro.foto" alt="Foto do Veículo" />
          </td>
          <td>
            <button
              class="btn btn-sm btn-info mx-1"
              title="Destacar"
              @click="destacar(carro.id)"
            >
              <i class="far fa-star"></i>
            </button>
            <button
              class="btn btn-warning btn-sm mx-1"
              title="Alterar"
              @click="editar(carro.id)"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm mx-1"
              title="Excluir"
              @click="excluir(carro.id, carro.modelo)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carro: {
        id: null,
        modelo: null,
        marca_id: null,
        preco: null,
        ano: null,
        foto: null,
        destaque: null,
      },
      filtro: "",
      carros: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/carros")
        .then((response) => (this.carros = response.data));
      this.filtro = "";  
    },

    editar(id) {
      axios
        .get(this.$urlAPI + "/carros/" + id)
        .then((response) => {
          this.carro = response.data
          this.$router.push({ path: "/formcarros", query: { altera: this.carro }})
        });
    },

    destacar(id) {
      axios.put(this.$urlAPI + "/carros/destaque/" + id).then((response) => {
        if (response.status == 200) {
          this.listar();
        }
      });
    },

    excluir(id, modelo) {
      if (confirm(`Confirma exclusão do veículo '${modelo}'?`)) {
        axios.delete(this.$urlAPI + "/carros/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Ok! Veículo '${modelo}' excluído com sucesso!`);
            this.listar();
          }
        });
      }
    },

    pesquisar() {
      if (this.filtro.length == 0) {
        this.listar();     // mostra todos
      } else {
        axios
          .get(this.$urlAPI + "/carros/pesq/" + this.filtro)
          .then((response) => (this.carros = response.data));
      }
    },
  },
  filters: {
    estiloMoeda(value) {
      return Number(value).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
    },
    destacaCarro(value) {
      return value ? "x" : "";
    },
  },
};
</script>

<style scoped>
table img {
  width: 100px;
  height: 60px;
}
</style>
