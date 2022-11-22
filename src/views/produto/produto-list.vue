<template>
  <div class="produto-list columns is-12">
    <div class="column is-12 is-size-3 nomePage" style="color: black">
      <div class=""><img src="../imagens/produtos.png" /></div>
      <p style="margin-left: 10px">Lista de produtos</p>
    </div>
  </div>

  <div class="columns is-12 pesquisa-bar" style="display: flex">
    <div class="pesquisa" style="display: flex">
      <input class="input" type="text" placeholder="Buscar..." />
      <button class="button botao buscar">Buscar</button>
    </div>
    <div class="botoes">
      <router-link to="/produto-cadastro"
        ><button class="button botao novo" style="margin-right: 30px">
          +
        </button></router-link
      >
      <router-link to="/categoria-list"
        ><button class="button botao categorias" style="margin-right: 30px">
          Categorias
        </button></router-link
      >
      <router-link to="/fornecedor-list"
        ><button class="button botao fornecedores" style="margin-right: 30px">
          Fornecedores
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
        <th>Categoria</th>
        <th>Opções</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in produtoList" :key="item.id">
        <th>{{ item.id }}</th>
        <th>
          <span v-if="item.ativo" class="tag is-success"> Ativo </span>
          <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
        </th>
        <th>{{ item.nome }}</th>
        <th>{{ item.categoria.nome }}</th>
        <th>
          <button class="button botao detalhar">
            <router-link
              to="/produto-cadastro"
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

import { Produto } from "@/model/produto";
import { ProdutoClient } from "@/client/produto.client";

export default class ProdutoList extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Produto> = new PageResponse();
  public produtoList: Produto[] = [];
  public produtoClient!: ProdutoClient;

  public mounted(): void {
    this.produtoClient = new ProdutoClient();
    this.listarProduto();
  }

  public listarProduto(): void {
    this.produtoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.produtoList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public onClickPaginaDetalhar(idProduto: number) {
    this.$router.push({
      name: "produto-detalhar",
      params: { id: idProduto, model: "detalhar" },
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

.fornecedores {
  color: #fff;
}

.fornecedores:hover {
  color: #fff;
}

.categorias {
  color: #fff;
}

.categorias:hover {
  color: #fff;
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
