<template>
  <div class="container">

    <div class="title-box columns is-12 title is-4">
      <p style="margin-left: 15px">Produto - Lista de Registros</p>
    </div>

    <div class="columns is-12 pesquisa-bar" style="display: flex">
      <div class="pesquisa" style="display: flex">
        <input class="input" type="text" placeholder="Buscar..." />
        <button class="button buscar">
          <img src="../imagens/pesquisa.png" />
        </button>
        <router-link to="/produto-cadastro">
          <button class="button botao novo" style="margin-right: 30px">
            Novo Produto
          </button>
        </router-link>
      </div>
      <div class="botoes">
        <router-link to="/categoria-list">
          <button class="button botao categorias" style="margin-right: 30px">
            Categorias
          </button>
        </router-link>
        <router-link to="/fornecedor-list">
          <button class="button botao fornecedores">
            Fornecedores
          </button>
        </router-link>
      </div>
    </div>

    <div class="columns is-12 table">
      <table class="table-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ativo</th>
            <th>Nome</th>
            <th>Ações</th>
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
    </div>
  </div>
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

.container{
  margin: 0;
  width: 100%;
  max-width: 88vw !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.title-box {
  background: #d4d4d4;
  border-radius: 7px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
}

.pesquisa-bar {
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
}

.pesquisa .input {
  border-radius: 7px 0px 0px 7px;
  background: #d4d4d4;
}

.pesquisa {
  width: 45em;
}

.buscar {
  border-radius: 0px 7px 7px 0px;
  background-color: #b1b1b1;
}

.buscar img {
  width: 19px;
}

.buscar:hover {
  background-color: #b1b1b1c4;
  outline: none;
  border: none;
}

.botao {
  border-radius: 7px;
  background-color: #044dbc;
}

.botao:hover {
  background-color: #1271ff;
}

.novo {
  margin-left: 30px;
  color: white;
  background-color: rgb(43, 168, 62);
}

.novo:hover {
  color: white;
  background-color: rgb(45, 255, 77);
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

.table {
  width: 100%;
  background-color: #EAEAEA;
  margin-top: 5px;
}

.table-list {
  width: 100%;
  background: #d4d4d4;
  border-radius: 7px;
}

.detalhar {
  color: #fff;
  background-color: yellow;
}

.detalhar:hover {
  color: rgb(208, 255, 0);
}


</style>
