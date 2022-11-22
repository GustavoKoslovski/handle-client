<template>
  <div class="categoria-cadastro columns is-centered" style="margin-top: 100px">
    <form class="fundo">
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
              <h1>Detalhes do categoria</h1>
            </div>
            <div
              class="column is-size-3"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <h1>Cadastro de categoria</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de categoria</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-half">
              <label class="label">Nome:</label>
              <input
                class="input nome"
                type="text"
                v-model="categoria.nome"
                placeholder="Nome do categoria"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex; margin-left: 12px">
            <label class="label">
              <input
                v-model="categoria.ativo"
                checked
                type="checkbox"
                :disabled="model === 'detalhar'"
              />
              Ativar categoria
            </label>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div
              class="opcoes column"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <a href="/categoria-list" class="button">Voltar</a>
              <button class="button salvar" @click="onClickCadastrar()">
                Salvar
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <a href="/categoria-list" class="button">Voltar</a>
              <button
                class="button editar"
                @click="onClickPaginaEditar(categoria.id)"
              >
                Editar
              </button>
              <button class="button excluir" @click="onClickDeletar">
                Excluir
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/categoria-list" class="button">Voltar</a>
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

import { Categoria } from "@/model/categoria";
import { Notification } from "@/model/notification";
import { CategoriaClient } from "@/client/categoria.client";

export default class CategoriaForm extends Vue {
  public categoriaClient!: CategoriaClient;
  public categoria: Categoria = new Categoria();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public mounted(): void {
    this.categoriaClient = new CategoriaClient();
    this.carregarcategoria();

    console.log(this.id);
    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.categoriaClient.cadastrar(this.categoria).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "categoria cadastrado com sucesso!"
        );
        this.onClickLimpar();
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
    this.categoriaClient.desativar(this.categoria).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "categoria foi Desativado com sucesso!"
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

  public onClickPaginaEditar(idCategoria: number) {
    this.$router.push({
      name: "categoria-editar",
      params: { id: idCategoria, model: "editar" },
    });
    console.log("ta chamando");
  }

  public onClickSalvarAlteracao(): void {
    this.categoriaClient.editar(this.categoria).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "categoria foi Editado com sucesso!"
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

  public carregarcategoria(): void {
    console.log("carregarcategoria" + this.id);
    console.log("nome" + this.categoria.nome);
    this.categoriaClient
      .findById(this.id)
      .then((value) => {
        this.categoria = value;
        console.log("categoria" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.categoria = new Categoria();
  }
}
</script>

<style>
.fundo {
  background-color: #d4d4d4;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 10px 0 rgba(46, 46, 46, 0.37);
  width: 60em;
  border-radius: 40px;
}

.control .input {
  background-color: #d4d4d4;
  color: rgb(255, 255, 255);
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