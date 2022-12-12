<template>
  <div class="container">

    <div class="title-box columns is-12 title is-4">
      <p style="margin-left: 15px">Estoque - Lista de Registros</p>
    </div>

    <div class="columns is-12 pesquisa-bar" style="display: flex">
      <div class="pesquisa" style="display: flex">
        <input class="input" type="text" placeholder="Buscar..." />
        <button class="button buscar">
          <img src="../imagens/mais.png" />
        </button>
        <router-link to="/estoque-cadastro">
          <button class="button novo" style="margin-right: 30px">
            Novo Movimento
          </button>
        </router-link>
      </div>
    </div>

    <div class="columns is-12 table">
      <table class="table-list">
        <thead>
          <tr>
            <th>Data</th>
            <th>Saída/Entrada</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in movimentoEstoqueList" :key="item.id">
            <th>{{ item.data }}</th>
            <th>{{ item.tipoMovimento }}</th>
            <th>{{ item.valor }}</th>
            <th>
              <button class="button botao detalhar" style="align-items: center;">
                <router-link
                  to="/estoque-cadastro"
                  @click="onClickPaginaEditar(item.id)"
                  ><img src="../imagens/editar.png" alt=""></router-link
                >
              </button>
              <button class="button botao excluir">
                <router-link
                  to="/estoque-cadastro"
                  @click="onClickPaginaEditar(item.id)"
                  ><img src="../imagens/lixeira.png" alt="" style="width: 18px"></router-link
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

import { MovimentoEstoqueClient } from "@/client/movimentoEstoque.client";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { MovimentoEstoque } from "@/model/movimentoEstoque";

export default class ProdutoList extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<MovimentoEstoque> = new PageResponse();
  public movimentoEstoqueList: MovimentoEstoque[] = [];
  public movimentoEstoqueClient!: MovimentoEstoqueClient;

  public mounted(): void {
    this.movimentoEstoqueClient = new  MovimentoEstoqueClient();
    this.listarMovimentoEstoque();
  }

  public onClickPaginaEditar(idMovimentoEstoque: number) {
    this.$router.push({
      name: "movimentoEstoque-editar",
      params: { id: idMovimentoEstoque, model: "editar" },
    });
  }


  public listarMovimentoEstoque(): void {
    this.movimentoEstoqueClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.movimentoEstoqueList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public onClickPaginaDetalhar(idMovimentoEstoque: number) {
    this.$router.push({
      name: "estoque-detalhar",
      params: { id: idMovimentoEstoque, model: "detalhar" },
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

.novo {
  border-radius: 7px;
  margin-left: 30px;
  color: white;
  background-color: #1271ff;
}

.novo:hover {
  color: white;
  background-color: #68a4ff;
}

.fornecedores {
  border-radius: 7px;
  background-color: #ff6d12;
  color: #fff;
}

.fornecedores:hover {
  color: #fff;
  background-color: #ff904b;
}

.categorias {
  border-radius: 7px;
  background-color: #ff6d12;
  color: #fff;
}

.categorias:hover {
  color: #fff;
  background-color: #ff904b;
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
  background-color: #31A4B4;
}

.detalhar:hover {
  color: #177b88;
}
.excluir {
  color: #050505;
  background-color: #E51A1A;
}

.detalhar:hover {
  color: #ff0000;
}
</style>
