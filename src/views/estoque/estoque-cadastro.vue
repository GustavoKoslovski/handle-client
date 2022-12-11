<template>
  <div class="container">
    <div class="title-box columns is-12 title is-4" v-if="model != 'detalhar' && model != 'editar'">
      <p style="margin-left: 15px">Estoque - Novo Registro</p>
    </div>

    <form class="form columns is-12 mt-4">
      <div class="columns is-12 form-inputs">
        <div class="column is-12 is-size-3 form-inputs pr-0">
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12">
              <div :class="notification.classe">
                <button @click="onClickFecharNotificacao()" class="delete"></button>
                {{ notification.mensagem }}
              </div>
            </div>
          </div>
          <div class="linha1 columns is-12 m-0 pl-0 pr-0">
            <div class="control column is-2 pl-0">
              <label class="label">ID</label>
              <input class="input" type="number" v-model="movimentoEstoque.id" placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'" />
            </div>
            <div class="control column is-4">
              <label class="label">Data</label>
              <input class="input" type="datetime" v-model="movimentoEstoque.data"
                :disabled="model === 'detalhar' || model != 'detalhar'" />
            </div>



            <div class="control column is-6">
              <label class="label">Produto</label>
              <div class="control" style="display: flex;">
                <select class="input " id="movEstoqueProduto" v-model="movEstoqueProduto.produto">
                  <option value="" disabled selected>Lista de Produtos</option>
                  <option v-for="item in produtoList" v-bind:key="item.id" v-bind:value="item">
                    {{ item.nome }}
                  </option>
                </select>
                <button type="button" class="button adicionar" @click="onClickAdicionarProduto(movEstoqueProduto)">
                  +
                </button>
              </div>
            </div>
          </div>

          <div class="column is-6 prod-table-body" style="display:flex">
            <div class="prod-table-row" v-for="(item, index) in movEstoqueProdutoList" :key="item.id">
              <div class="prod-table-cell" style="width: 50%; margin-left: 2.5%">
                <p>{{ item.produto.nome }}</p>
              </div>
              <div class="prod-table-cell" style="width: 25%;">
                <p>{{ item.produto.valorCusto }}</p>
              </div>
              <div class="prod-table-cell" style="width: 20%;">
                <button type="button" @click="setQuantidade('-', index)" class="botao menos">
                  -
                </button>
                {{ item.quantidade }}
                <button type="button" @click="setQuantidade('+', index)" class="botao mais">
                  +
                </button>
              </div>
            </div>
          </div>

          <div class="column is-6 pl-0 ">
            <button type="button" class="button status" @click="onClickCancelar()">
              <p>TOTAL: </p>
            </button>
          </div>

          <div class="opcoes column is-5 pr-0">
            <div class="column is-12 pl-0 pr-0">
              <div class="venda-linha5 columns is-6 m-0 p-0">
                <div class="column is-6 pl-0">
                  <!-- <a type="button" href="/venda-list" class="button voltar">
                      CANCELAR
                    </a> -->
                  <button type="button" class="button voltar" @click="onClickCancelar()">
                    CANCELAR
                  </button>
                </div>
                <div class="column is-6 pl-0">
                  <button type="button" class="button salvar" @click="onClickCadastrar()">
                    SALVAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
  
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import moment from "moment";

import { MovimentoEstoque } from "@/model/movimentoEstoque";
import { MovEstoqueProduto } from "@/model/movEstoqueProduto";
import { MovEstoqueProdutoClient } from "@/client/movEstoqueProduto.client";
import { Notification } from "@/model/notification";
import { MovimentoEstoqueClient } from "@/client/movimentoEstoque.client";
import { ProdutoClient } from "@/client/produto.client";
import { Produto } from "@/model/produto";
import { AbstractEntity } from "@/model/abstract-entity";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class EstoqueForm extends Vue {
  public abstractEntity: AbstractEntity = new AbstractEntity();
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse1: PageResponse<Produto> = new PageResponse();
  public pageResponse2: PageResponse<MovEstoqueProduto> = new PageResponse();

  public movimentoEstoque: MovimentoEstoque = new MovimentoEstoque();
  public movimentoEstoqueClient!: MovimentoEstoqueClient;
  public movEstoqueProduto: MovEstoqueProduto = new MovEstoqueProduto();
  public movEstoqueProdutoList: MovEstoqueProduto[] = [];
  public movEstoqueProdutoClient!: MovEstoqueProdutoClient;
  public produtoList: Produto[] = [];
  public produtoClient!: ProdutoClient;

  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public listarProduto(): void {
    this.produtoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse1 = success;
        this.produtoList = this.pageResponse1.content;
      },
      (error) => console.log(error)
    );
  }

  public listarMovimentoProduto(): void {
    this.movEstoqueProdutoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse2 = success;
        this.movEstoqueProdutoList = this.pageResponse2.content;
      },
      (error) => console.log(error)
    );
  }

  public mounted(): void {
    this.produtoClient = new ProdutoClient();
    this.listarProduto();
    this.movEstoqueProdutoClient = new MovEstoqueProdutoClient();
    this.listarMovimentoProduto();
    this.movimentoEstoqueClient = new MovimentoEstoqueClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.movimentoEstoque.data = currentDate;
    this.carregarEstoque();

    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.movimentoEstoqueClient.cadastrar(this.movimentoEstoque).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Movimento de Estoque Cadastrado com sucesso!"
        );
      },
      (error) => {
        console.log(error.response);
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.data
        );
      }
    );
    this.movEstoqueProdutoList.forEach((element) => {
      this.movEstoqueProdutoClient.cadastrar(element);
    });
  }

  public onClickDeletar(): void {
    this.movimentoEstoqueClient.desativar(this.movimentoEstoque).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Movimento de Estoque foi Desativado com sucesso!"
        );
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.data
        );
      }
    );
  }

  public onClickCancelar(): void {
    this.$router.push("estoque-list");
  }

  public onClickPaginaEditar(idestoque: number) {
    this.$router.push({
      name: "estoque-editar",
      params: { id: idestoque, model: "editar" },
    });
    console.log("ta chamando");
  }

  public onClickSalvarAlteracao(): void {
    this.movimentoEstoqueClient.editar(this.movimentoEstoque).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Movimento do Estoque foi Editado com sucesso!"
        );
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.data
        );
      }
    );
  }

  public carregarEstoque(): void {
    this.movimentoEstoqueClient
      .findById(this.id)
      .then((value) => {
        this.movimentoEstoque = value;
        this.movimentoEstoque.data = moment(this.movimentoEstoque.cadastro).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        console.log("estoque" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.movimentoEstoque = new MovimentoEstoque();
  }

  public setStatus(): void {
    if (this.movimentoEstoque.ativo == false) {
      this.movimentoEstoque.ativo = true;
    } else {
      this.movimentoEstoque.ativo = false;
    }
  }

  public setQuantidade(sinal: string, index: number): void {
    debugger;
    if (sinal == "-") {
      if (this.movEstoqueProdutoList[index].quantidade != 1) {
        this.movEstoqueProdutoList[index].quantidade--;
        this.movEstoqueProdutoList[index].precoFinal = this.movEstoqueProdutoList[index].precoUnitario * this.movEstoqueProdutoList[index].quantidade;
        this.movimentoEstoque.valorTotal -= this.movEstoqueProdutoList[index].precoUnitario;
      } else {
        this.movimentoEstoque.valorTotal -= this.movEstoqueProdutoList[index].precoUnitario;
        this.movEstoqueProdutoList.splice(index, 1)
      }
    } else {
      this.movEstoqueProdutoList[index].quantidade++;
      this.movEstoqueProdutoList[index].precoFinal = this.movEstoqueProdutoList[index].precoUnitario * this.movEstoqueProdutoList[index].quantidade;
      this.movimentoEstoque.valorTotal += this.movEstoqueProdutoList[index].precoUnitario;
    }

  }

  public onClickAdicionarProduto(movEstoqueProdutoNew: MovEstoqueProduto): void {
    debugger;
    if (movEstoqueProdutoNew.produto.id != null) {
      movEstoqueProdutoNew = new MovEstoqueProduto();
      movEstoqueProdutoNew.quantidade = 1;
      movEstoqueProdutoNew.produto = this.movEstoqueProduto.produto;
      movEstoqueProdutoNew.precoUnitario = this.movEstoqueProduto.produto.valorCusto;
      movEstoqueProdutoNew.precoFinal = movEstoqueProdutoNew.precoUnitario * movEstoqueProdutoNew.quantidade;
      if (this.movimentoEstoque.valorTotal == null) {
        this.movimentoEstoque.valorTotal = 0;
      }
      this.movimentoEstoque.valorTotal += movEstoqueProdutoNew.precoFinal;

      this.movEstoqueProdutoList.push(movEstoqueProdutoNew);
    }
  }

}
</script>
  
<style>
.pesquisa-bar {
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
}

.pesquisaVenda .input {
  border-radius: 7px 0px 0px 7px;
  background: #d4d4d4;
}

.table-produtos {
  width: 100%;
  background-color: #eaeaea;
}

.table-list-produtos {
  width: 100%;
  background: #d4d4d4;
  border-radius: 7px;
}


.pesquisaVenda {
  width: 100%;
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

.notification {
  font-size: 18px;
}

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

.form {
  width: 100%;
}

.form-inputs {
  width: 100%;
  padding-left: 0 !important;
  margin-left: 0 !important;
}

.linha1,
.linha2,
.linha3,
.linha4 {
  padding: 0 !important;
}


.control {
  padding-top: 0;
}

.control .input {
  background-color: #d4d4d4;
  color: rgb(0, 0, 0);
  border-radius: 7px;
}

.prod-table-body {
  width: 90%;
  height: 400px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 20px;
  overflow-y: auto;
}

.prod-table-row {
  width: 100%;
  min-height: 40px;
  background: #d4d4d4;
  display: flex;
  align-items: center;
  border-radius: 7px;
  font-size: 20px;
  /* margin-top: 10p;s */
  margin-bottom: 10px;
  box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.19);
}

/* width */
.prod-table-body::-webkit-scrollbar {
  width: 40px;
}

/* Track */
.prod-table-body::-webkit-scrollbar-track {
  background: #d4d4d4;
  border-radius: 10px;
}

/* Handle */
.prod-table-body::-webkit-scrollbar-thumb {
  background: #B1B1B1;
  border-radius: 10px;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.10);
}

/* Handle on hover */
.prod-table-body::-webkit-scrollbar-thumb:hover {
  background: #a8a6a0;
}

.produto {
  padding-left: 0 !important;
}

.adicionar {
  background-color: #1271ff;
  color: #fff
}

.adicionar:hover {
  background-color: #68a4ff;
  color: #fff
}

::placeholder {
  color: rgb(255, 255, 255);
}

::-webkit-input-placeholder {
  /* Chrome */
  color: rgb(255, 255, 255);
}

.ativo,
.salvar {
  width: 100%;
  color: #fff !important;
  border-radius: 7px !important;
  background-color: #1bc856 !important;
}

.voltar,
.inativo {
  width: 100%;
  color: #fff !important;
  border-radius: 7px !important;
  background-color: #e51a1a !important;
}

.voltar:hover,
.inativo:hover {
  color: #fff;
  background-color: #ff5353 !important;
  border: solid 1px #ff5353;
}

.salvar:hover,
.ativo:hover {
  color: #fff;
  background-color: #34f374 !important;
  border: solid 1px #34f374;
}

.editar {
  background-color: #11138d;
}

.editar:hover {
  color: #fff;
  background-color: #2125fd;
}

.excluir {
  background-color: #641c1c;
}

.excluir:hover {
  color: #fff;
  background-color: #fa0909;
}
</style>