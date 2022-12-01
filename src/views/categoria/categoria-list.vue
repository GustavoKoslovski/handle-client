<template>
  <div class="container">

    <div class="title-box columns is-12 title is-4">
      <p style="margin-left: 15px">Categoria - Lista de Registros</p>
    </div>

    <div class="columns is-12 pesquisa-bar" style="display: flex">
      <div class="pesquisa" style="display: flex">
        <input class="input" type="text" placeholder="Buscar..." />
        <button class="button buscar">
          <img src="../imagens/pesquisa.png" />
        </button>
        <router-link to="/categoria-cadastro">
          <button class="button botao novo" style="margin-right: 30px">
            Nova Categoria
          </button>
        </router-link>
      </div>
      <div class="botoes">
        <router-link to="/produto-list">
          <button class="button voltar">
            Voltar
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
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in categoriaList" :key="item.id">
            <th>{{ item.id }}</th>
            <th>
              <span v-if="item.ativo" class="tag is-success"> Ativo </span>
              <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
            </th>
            <th>{{ item.nome }}</th>
            <th>
              <button class="button botao detalhar">
                <router-link
                  to="/categoria-cadastro"
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

import { Categoria } from "@/model/categoria";
import { CategoriaClient } from "@/client/categoria.client";

export default class categoriaList extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Categoria> = new PageResponse();
  public categoriaList: Categoria[] = [];
  public categoriaClient!: CategoriaClient;

  public mounted(): void {
    this.categoriaClient = new CategoriaClient();
    this.listarcategoria();
  }

  public listarcategoria(): void {
    this.categoriaClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.categoriaList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public onClickPaginaDetalhar(idCategoria: number) {
    this.$router.push({
      name: "categoria-detalhar",
      params: { id: idCategoria, model: "detalhar" },
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

.voltar {
  border-radius: 7px;
  background-color: #ec2c2c;
  color: #FFF;
}

.voltar:hover {
  background-color: #d21717;
  color: #FFF;
}

.novo {
  margin-left: 30px;
  color: white;
  background-color: #044dbc;
}

.novo:hover {
  color: white;
  background-color: #1271ff;
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