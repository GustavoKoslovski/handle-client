<template>
  <div class="produto-cadastro columns is-centered" style="margin-top: 2vh">
    <div
      class="column is-size-3"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <div class="column is-9 nomePageCadastro" style="color: black">
        <div class=""><img src="../imagens/produtos.png" /></div>
        <p style="margin-left: 10px">Produto - Novo Registro</p>
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
              <h1>Detalhes do produto</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de produto</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-half">
              <label class="label">Nome:</label>
              <input
                class="input nome"
                type="text"
                v-model="produto.nome"
                placeholder="Nome do produto"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-half">
              <label class="label">Código de barras:</label>
              <input
                class="input codigo"
                type="text"
                v-model="produto.codigoDeBarras"
                placeholder="Apenas Números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha2 column" style="display: flex">
            <div class="control column is-one-quarter">
              <label class="label">Valor de custo:</label>
              <input
                class="input"
                type="text"
                v-model="produto.valorCusto"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Valor de venda:</label>
              <input
                class="input"
                type="text"
                v-model="produto.valorVenda"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Fornecedor:</label>
              <select
                class="input"
                id="produto"
                v-model="produto.fornecedor.id"
              >
                <option value="" disabled selected>Lista de produtos</option>
                <option
                  v-for="item in fornecedorList"
                  v-bind:key="item.id"
                  v-bind:value="item.id"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Categoria:</label>
              <select
                class="input"
                id="categoria"
                v-model="produto.categoria.id"
              >
                <option value="" disabled selected>Lista de Categorias</option>
                <option
                  v-for="item in categoriaList"
                  v-bind:key="item.id"
                  v-bind:value="item.id"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="linha3 column" style="display: flex; margin-left: 12px">
            <label class="label">
              <input
                v-model="produto.ativo"
                checked
                type="checkbox"
                :disabled="model === 'detalhar'"
                style="margin-left: 3em"
              />
              Ativar produto
            </label>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div
              class="opcoes column"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <a href="/produto-list" class="button">Voltar</a>
              <button class="button salvar" @click="onClickCadastrar()">
                Salvar
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <a href="/produto-list" class="button">Voltar</a>
              <button
                class="button editar"
                @click="onClickPaginaEditar(produto.id)"
              >
                Editar
              </button>
              <a href="/produto-list" class="button">Voltar</a>
              <button class="button excluir" @click="onClickDeletar">
                Excluir
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/produto-list" class="button">Voltar</a>
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

import { Produto } from "@/model/produto";
import { Notification } from "@/model/notification";
import { ProdutoClient } from "@/client/produto.client";
import { FornecedorClient } from "@/client/fornecedor.client";
import { CategoriaClient } from "@/client/categoria.client";
import { Categoria } from "@/model/categoria";
import { Fornecedor } from "@/model/fornecedor";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class ProdutoForm extends Vue {
  public fornecedorList: Fornecedor[] = [];
  public categoriaList: Categoria[] = [];
  public fornecedorClient!: FornecedorClient;
  public categoriaClient!: CategoriaClient;
  public fornecedor: Fornecedor = new Fornecedor();
  public categoria: Categoria = new Categoria();
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Fornecedor> = new PageResponse();
  public pageResponse2: PageResponse<Categoria> = new PageResponse();

  public produtoClient!: ProdutoClient;
  public produto: Produto = new Produto();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public listarFornecedor(): void {
    this.fornecedorClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.fornecedorList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public listarCategoria(): void {
    this.categoriaClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse2 = success;
        this.categoriaList = this.pageResponse2.content;
      },
      (error) => console.log(error)
    );
  }

  public mounted(): void {
    this.produtoClient = new ProdutoClient();
    this.carregarProduto();
    this.fornecedorClient = new FornecedorClient();
    this.listarFornecedor();
    this.categoriaClient = new CategoriaClient();
    this.listarCategoria();

    console.log(this.id);
    console.log(this.model);
  }

  public onClickCadastrar(): void {
    console.log(this.produto);
    debugger;
    this.produtoClient.cadastrar(this.produto).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Produto Cadastrado com sucesso!"
        );
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error
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
          "Error: " + error
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
          "Error: " + error
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

  // private created(): void { }
}
</script>

<style>
.nomePageCadastro {
  width: 80vh;
  height: 10vh;
  left: 40vh;
  background: #d4d4d4;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.menu {
  width: 100vh;
  position: absolute;
  left: 30vh;
  top: 15vh;
}

.control .input {
  background-color: #d4d4d4;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  border-left: 1px solid rgba(255, 255, 255, 0.5);
}
::placeholder {
  color: rgb(255, 255, 255);
}

::-webkit-input-placeholder {
  /* Chrome */
  color: rgb(255, 255, 255);
}

.opcoes a,
.opcoes button {
  margin-right: 22px;
  border-radius: 10px;
}

.opcoes a,
.opcoes button {
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.opcoes a {
  background-color: rgb(102, 21, 21);
}

.opcoes a:hover {
  background-color: red;
}

.opcoes .salvar {
  background-color: #1d660b;
}

.opcoes .salvar:hover {
  color: rgb(255, 255, 255);
  background-color: #1bc856;
}

.opcoes .editar {
  background-color: #11138d;
}

.opcoes .editar:hover {
  color: #fff;
  background-color: #2125fd;
}

.opcoes .excluir {
  background-color: #641c1c;
}

.opcoes .excluir:hover {
  color: #fff;
  background-color: #fa0909;
}
</style>