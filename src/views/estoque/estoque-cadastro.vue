<template>
  <div class="estoque-cadastro columns is-centered" style="margin-top: 2vh">
    <div
      class="column is-size-3"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <div class="column is-9 nomePageCadastro" style="color: black">
        <div class=""><img src="../imagens/estoque.png" /></div>
        <p style="margin-left: 10px">Movimento de Estoque - Novo Registro</p>
      </div>
    </div>
    <form class="menu">
      <div class="columns" v-if="notification.ativo">
        <div class="column is-12">
          <div :class="notification.classe">
            <button @click="onClickFecharNotificacao()" class="delete"></button>
            {{ notification.mensagem }}
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-11 is-size-3">
          <div class="linha0 column" style="display: flex">
            <div class="column is-size-3" v-if="model === 'detalhar'">
              <h1>Detalhes do registro de Estoque</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de Estoque</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-one-quarter">
              <label class="label">Produto:</label>
              <select class="input" id="produto" v-model="produto.id">
                <option value="" disabled selected>Lista de produtos</option>
                <option
                  v-for="item in produtoList"
                  v-bind:key="item.id"
                  v-bind:value="item.id"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Quantidade:</label>
              <input
                class="input"
                type="text"
                v-model="produto.quantidade"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex; margin-left: 12px">
            <label class="label">
              <input
                v-model="produto.ativo"
                checked
                type="checkbox"
                :disabled="model === 'detalhar'"
              />
              Entrada?
            </label>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div
              class="opcoes column"
              v-if="model != 'detalhar' && model != 'movimento-estoque'"
            >
              <a href="/estoque-list" class="button">Voltar</a>
              <button
                class="button salvar"
                @click="onClickPaginaEditar(produto.id)"
              >
                Salvar
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <a href="/estoque-list" class="button">Voltar</a>
              <button
                class="button editar"
                @click="onClickPaginaEditar(movimentoEstoque.id)"
              >
                Editar
              </button>
              <button class="button excluir" @click="onClickDeletar">
                Excluir
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/estoque-list" class="button">Voltar</a>
              <button class="button salvar" @click="onClickSalvarAlteracao()">
                Salvar Alterações
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
import { Notification } from "@/model/notification";
import { MovimentoEstoque } from "@/model/movimentoEstoque";
import { MovimentoEstoqueClient } from "@/client/movimentoEstoque.client";
import { Produto } from "@/model/produto";
import { ProdutoClient } from "@/client/produto.client";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class MovimentoEstoqueForm extends Vue {
  public movimentoEstoqueList: MovimentoEstoque[] = [];
  public movimentoEstoqueClient!: MovimentoEstoqueClient;
  public produtoList: Produto[] = [];
  public produtoClient!: ProdutoClient;
  public produto: Produto = new Produto();
  public movimentoEstoque: MovimentoEstoque = new MovimentoEstoque();
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Produto> = new PageResponse();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public listarProduto(): void {
    this.produtoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.produtoList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public mounted(): void {
    this.movimentoEstoqueClient = new MovimentoEstoqueClient();
    this.carregarMovimentoEstoque();
    this.produtoClient = new ProdutoClient();
    this.listarProduto();
  }

  public onClickCadastrar(): void {
    this.movimentoEstoqueClient.cadastrar(this.movimentoEstoque).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "movimentoEstoque Cadastrado com sucesso!"
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
      name: "movimento-estoque",
      params: { id: idProduto, model: "movimento-estoque" },
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

  public carregarMovimentoEstoque(): void {
    this.movimentoEstoqueClient
      .findById(this.id)
      .then((value) => {
        this.movimentoEstoque = value;
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

  // private created(): void { }
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