<template>
  <div class="container">
    <div class="title-box columns is-12 title is-4" v-if="model != 'detalhar' && model != 'editar'">
      <p style="margin-left: 15px">Movimento de Estoque - Novo Produto</p>
    </div>

    <form class="form columns is-12">
      <div class="columns is-12 form-inputs">
        <div class="column is-12 is-size-3 form-inputs">
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12">
              <div :class="notification.classe">
                <button @click="onClickFecharNotificacao()" class="delete"></button>
                {{ notification.mensagem }}
              </div>
            </div>
          </div>
          <div class="column linha0" style="display: flex">
            <div class="column is-size-3" v-if="model === 'detalhar'">
              <h1>Detalhes do Estoque</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição do Estoque</h1>
            </div>
          </div>

          <div class="linha1 column" style="display: flex">
            <div class="control column is-one-fifth pl-0">
              <label class="label">ID</label>
              <input class="input" type="number" v-model="produto.id" placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'" />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Data</label>
              <input class="input" type="datetime" v-model="produto.data"
                :disabled="model === 'detalhar' || model != 'detalhar'" />
            </div>
            <div class="control column is-three-fifths">
              <label class="label">Produto</label>
              <div class="pesquisa" style="display: flex">
                <input class="input" type="text" placeholder="Pesquisar..." />
                <button class="button buscar">
                  <img src="../imagens/mais.png" />
                </button>
              </div>
            </div>
          </div>

          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div class="opcoes column" v-if="model != 'detalhar' && model != 'editar'">
              <button type="button" class="button" v-bind:class="[produto.ativo == true ? 'ativo' : 'inativo']"
                @click="setStatus()">
                {{ produto.ativo == true ? "ATIVO" : "INATIVO" }}
              </button>
              <a type="button" href="/produto-list" class="button voltar">
                CANCELAR
              </a>
              <button type="button" class="button salvar" @click="onClickCadastrar()">
                SALVAR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <button class="button editar" @click="onClickPaginaEditar(produto.id)">
                EDITAR
              </button>
              <a href="/produto-list" class="button"> VOLTAR </a>
              <button class="button excluir" @click="onClickDeletar">
                EXCLUIR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/produto-list" class="button"> VOLTAR </a>
              <button class="button salvar" @click="onClickSalvarAlteracao()">
                SALVAR ALTERAÇÕES
              </button>
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

import { MovimentoEstoqueClient } from "@/client/movimentoEstoque.client";
import { Produto } from "@/model/produto";
import { MovimentoEstoque } from "@/model/movimentoEstoque";
import { Notification } from "@/model/notification";
import { ProdutoClient } from "@/client/produto.client";
import { AbstractEntity } from "@/model/abstract-entity";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class ProdutoForm extends Vue {
  public produtoList: Produto[] = [];
  public movimentoEstoqueClient: MovimentoEstoqueClient[] = [];
  public produtoClient!: ProdutoClient;
  public abstractEntity: AbstractEntity = new AbstractEntity();
  public produto: Produto = new Produto();
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse2: PageResponse<Produto> = new PageResponse();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public listarProduto(): void {
    this.produtoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse2 = success;
        this.produtoList = this.pageResponse2.content;
      },
      (error) => console.log(error)
    );
  }

  public mounted(): void {
    this.produtoClient = new ProdutoClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.produto.data = currentDate;
    this.carregarProduto();
    this.produtoClient = new ProdutoClient();
    this.listarProduto();

    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.produtoClient.cadastrar(this.produto).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Produto Cadastrado com sucesso!"
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
  }

  public onClickDeletar(): void {
    this.produtoClient.desativar(this.produto).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Produto foi Desativado com sucesso!"
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

  public onClickPaginaEditar(idProduto: number) {
    this.$router.push({
      name: "produto-editar",
      params: { id: idProduto, model: "editar" },
    });
    console.log("ta chamando");
  }

  public onClickSalvarAlteracao(): void {
    this.produtoClient.editar(this.produto).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Produto foi Editado com sucesso!"
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

  public carregarProduto(): void {
    console.log("carregarProduto" + this.id);
    console.log("nome" + this.produto.nome);
    this.produtoClient
      .findById(this.id)
      .then((value) => {
        this.produto = value;
        this.produto.data = moment(this.produto.cadastro).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        console.log("produto" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.produto = new Produto();
  }

  public setStatus(): void {
    if (this.produto.ativo == false) {
      this.produto.ativo = true;
    } else {
      this.produto.ativo = false;
    }
  }

}
</script>

<style>
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

.pesquisa-bar {
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
}

.pesquisa button {
  border-radius: 0px 7px 7px 0px;
  background-color: #b1b1b1;
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

.form {
  width: 100%;
}

.form-inputs {
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

::placeholder {
  color: rgb(255, 255, 255);
}

::-webkit-input-placeholder {
  /* Chrome */
  color: rgb(255, 255, 255);
}

.ativo,
.salvar {
  color: #fff !important;
  border-radius: 7px !important;
  background-color: #1bc856 !important;
}

.voltar,
.inativo {
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