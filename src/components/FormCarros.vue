<template>
  <div class="container">
    <h2>
      <span v-if="carro.id">Alteração de Veículos</span>
      <span v-else>Inclusão de Veículos</span>

      <a class="btn btn-warning float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>

    <h4 v-if="erros.length" class="text-danger">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li
          v-for="(erro, index) in erros"
          class="text-danger small"
          :key="index"
        >
          {{ erro }}
        </li>
      </ul>
    </h4>

    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label for="modelo">Modelo do Veículo:</label>
            <input
              type="text"
              id="modelo"
              class="form-control"
              v-model="carro.modelo"
              ref="modelo"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="marca_id">Marca:</label>
            <select
              id="marca_id"
              class="form-control"
              v-model="carro.marca_id"
              required
            >
              <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
                {{ marca.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="preco">Preço R$</label>
            <input
              type="text"
              id="preco"
              class="form-control"
              v-model="carro.preco"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <label for="ano">Ano:</label>
            <input
              type="text"
              id="ano"
              class="form-control"
              v-model="carro.ano"
              required
            />
          </div>
        </div>
        <div class="col-sm-9">
          <div class="form-group">
            <label for="foto">URL da Foto:</label>
            <input
              type="text"
              id="foto"
              class="form-control"
              v-model="carro.foto"
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success px-4 mr-2">
        <i class="far fa-save"></i> Salvar
      </button>
      <button type="reset" class="btn btn-danger px-4">
        <i class="far fa-window-restore"></i> Limpar
      </button>
    </form>
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
      },
      marcas: null,
      erros: [],
    };
  },

  methods: {
    verificaForm() {
      // limpa vetor de erros
      this.erros = [];
      if (Number(this.carro.ano) >= 1970 && Number(this.carro.preco) >= 5000) {
        return true;
      }

      if (Number(this.carro.ano) < 1970) {
        this.erros.push("Revise o ano do veículo.");
      }
      if (Number(this.carro.preco) < 5000) {
        this.erros.push("Valor incorreto. Por favor, verifique.");
      }
      return false;
    },

    altera() {
      axios
        .put(this.$urlAPI + "/carros/" + this.carro.id, this.carro, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Veículo Alterado Corretamente ${response.data}`)
        );
    },

    inclui() {
      axios
        .post(this.$urlAPI + "/carros", this.carro, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Veículo Cadastro com código ${response.data.id}`)
        );
      this.carro = {}; // limpando o objeto carro, limpa os campos do form
      this.$refs.modelo.focus();
    },

    salvar() {
      // if (!localStorage.getItem("token")) {
      //   alert("Erro... Faça Login para Realizar a Inclusão / Alteração")
      //   return
      // }

      if (!this.verificaForm()) {
        return;
      }

      if (this.carro.id) {
        this.altera();
      } else {
        this.inclui();
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  mounted() {
    axios.get(this.$urlAPI + "/marcas").then((response) => {
      this.marcas = response.data;
    });

    if (this.$route.query.altera) {
      //      console.log(this.$route.query.altera)
      this.carro = this.$route.query.altera;
    }
  },
};
</script>

<style>
</style>
