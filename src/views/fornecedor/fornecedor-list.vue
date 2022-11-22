<template>
  <div class="fornecedor-list columns is-12">
    <div class="column is-12 is-size-3 nomePage" style="color: black">
      <div class=""><img src="../imagens/produtos.png" /></div>
      <p style="margin-left: 10px">Lista de fornecedores</p>
    </div>
  </div>
  <div class="columns is-12 pesquisa-bar" style="display: flex">
    <div class="pesquisa" style="display: flex">
      <input class="input" type="text" placeholder="Buscar..." />
      <button class="button buscar">Buscar</button>
    </div>
    <div class="botoes">
      <router-link to="/fornecedor-cadastro"
        ><button class="button novo" style="margin-right: 30px">
          +
        </button></router-link
      >
      <router-link to="/produto-list"
        ><button class="button botao voltar" style="margin-right: 30px">
          Voltar
        </button></router-link
      >
    </div>
  </div>
  <table class="table">
    <thead class="blue">
      <tr>
        <th>ID</th>
        <th>Ativo</th>
        <th>Nome</th>
        <th>Telefone</th>
        <th>Opções</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in fornecedorList" :key="item.id">
        <th>{{ item.id }}</th>
        <th>
          <span v-if="item.ativo" class="tag is-success"> Ativo </span>
          <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
        </th>
        <th>{{ item.nome }}</th>
        <th>{{ item.telefone }}</th>
        <th>
          <button class="button detalhar">
            <router-link
              to="/fornecedor-cadastro"
              @click="onClickPaginaDetalhar(item.id)"
              >Detalhar</router-link
            >
          </button>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

import { Fornecedor } from "@/model/fornecedor";
import { FornecedorClient } from "@/client/fornecedor.client";

export default class fornecedorList extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Fornecedor> = new PageResponse();
  public fornecedorList: Fornecedor[] = [];
  public fornecedorClient!: FornecedorClient;

  public mounted(): void {
    this.fornecedorClient = new FornecedorClient();
    this.listarfornecedor();
  }

  public listarfornecedor(): void {
    this.fornecedorClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.fornecedorList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public onClickPaginaDetalhar(idFornecedor: number) {
    this.$router.push({
      name: "fornecedor-detalhar",
      params: { id: idFornecedor, model: "detalhar" },
    });
  }
}
</script>


<style>
.nomePage {
  width: 1666px;
  height: 84px;
  left: 253px;
  margin-top: 34px;
  margin-bottom: 30px;
  margin-left: 30px;
  background: #d4d4d4;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.botoes {
  margin-left: 7px;
}

.botao {
  margin-right: 22px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  background-color: #2c80fd;
}

.buscar {
  border-radius: 0px 10px 10px 0px;
  background-color: #b1b1b1;
}

.buscar:hover {
  border-radius: 0px 10px 10px 0px;
  background-color: #ebe6e6;
}

.novo {
  color: rgb(0, 0, 0);
  background-color: rgb(127, 252, 127);
}

.novo:hover {
  color: rgb(11, 253, 23);
  background-color: rgb(23, 175, 23);
}

.detalhar {
  color: #fff;
  background-color: yellow;
}

.detalhar:hover {
  color: rgb(208, 255, 0);
}

.pesquisa-bar {
  width: 130em;
  margin-left: 0px;
}

.pesquisa .input {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px 0px 0px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  background: #d4d4d4;
}

.pesquisa {
  margin-left: 2px;
  width: 40em;
  margin-bottom: 20px;
}

.table {
  border-radius: 15px;
  width: 105em;
  background: #d4d4d4;
}

.table tr {
  border: solid 3px rgba(194, 194, 194, 0.188);
}
</style>
