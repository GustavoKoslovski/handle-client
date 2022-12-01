<template>
  <div class="container">

    <div class="title-box columns is-12 title is-4">
      <p style="margin-left: 15px">Cliente - Lista de Registros</p>
    </div>

    <div class="columns is-12 pesquisa-bar" style="display: flex">
      <div class="pesquisa" style="display: flex">
        <input class="input" type="text" placeholder="Buscar..." />
        <button class="button buscar">
          <img src="../imagens/pesquisa.png" />
        </button>
        <router-link to="/cliente-cadastro">
          <button class="button novo" style="margin-right: 30px">
            Novo Cliente
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
            <th>CPF</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clienteList" :key="item.id">
            <th>{{ item.id }}</th>
            <th>
              <span v-if="item.ativo" class="tag is-success"> Ativo </span>
              <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
            </th>
            <th>{{ item.nome }}</th>
            <th>{{ item.cpf }}</th>
            <th>
              <button class="botao detalhar">
                <router-link
                  to="/cliente-cadastro"
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

import { Cliente } from "@/model/cliente";
import { ClienteClient } from "@/client/cliente.client";

export default class clienteList extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Cliente> = new PageResponse();
  public clienteList: Cliente[] = [];
  public clienteClient!: ClienteClient;

  public mounted(): void {
    this.clienteClient = new ClienteClient();
    this.listarcliente();
  }

  public listarcliente(): void {
    this.clienteClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.clienteList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public onClickPaginaDetalhar(idCliente: number) {
    this.$router.push({
      name: "cliente-detalhar",
      params: { id: idCliente, model: "detalhar" },
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
