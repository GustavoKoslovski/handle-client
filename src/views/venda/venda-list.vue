<template>
  <div class="container">
    <div class="title-box columns is-12 title is-4">
      <p style="margin-left: 15px">Venda - Lista de Registros</p>
    </div>

    <div class="columns is-12 pesquisa-bar" style="display: flex">
      <div class="pesquisa" style="display: flex">
        <input class="input" type="text" placeholder="Buscar..." />
        <button class="button buscar">
          <img src="../imagens/pesquisa.png" />
        </button>
        <router-link to="/venda-cadastro">
          <button class="button novo" style="margin-right: 30px">
            Nova venda
          </button>
        </router-link>
      </div>
    </div>
    <div class="columns is-12 table">
      <table class="table-list">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Valor Final</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vendaList" :key="item.id">
            <th>{{ item.cliente.nome }}</th>
            <th>{{ item.funcionario.nome }}</th>
            <th>R$ {{ item.valorFinal }},00</th>
            <th>
              <button class="button botao detalhar" style="align-items: center;">
                <router-link
                  to="/venda-cadastro"
                  @click="onClickPaginaEditar(item.id)"
                  ><img src="../imagens/editar.png" alt=""></router-link
                >
              </button>
              <button class="button botao excluir">
                <router-link
                  to="/venda-cadastro"
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

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

import { Venda } from "@/model/venda";
import { VendaClient } from "@/client/venda.client";

export default class vendaList extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Venda> = new PageResponse();
  public vendaList: Venda[] = [];
  public vendaClient!: VendaClient;

  public mounted(): void {
    this.vendaClient = new VendaClient();
    this.listarVenda();
  }

  public listarVenda(): void {
    this.vendaClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.vendaList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }
  public onClickPaginaEditar(idvenda: number) {
    this.$router.push({
      name: "venda-editar",
      params: { id: idvenda, model: "editar" },
    });
    console.log("ta chamando");
  }
 
  public onClickPaginaDetalhar(idvenda: number) {
    this.$router.push({
      name: "venda-detalhar",
      params: { id: idvenda, model: "detalhar" },
    });
  }
}
</script>
  
  <style>
.container {
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
  background-color: #eaeaea;
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
  