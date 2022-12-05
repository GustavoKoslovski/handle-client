<template>
  <div class="container">
    <div
      class="title-box columns is-12 title is-4"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <p style="margin-left: 15px">Categoria - Novo Registro</p>
    </div>
    <form class="form columns is-12">
      <div class="columns is-12 form-inputs">
        <div class="column is-12 is-size-3 form-inputs">
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12 mensagem">
              <div :class="notification.classe">
                <button
                  @click="onClickFecharNotificacao()"
                  class="delete"
                ></button>
                {{ notification.mensagem }}
              </div>
            </div>
          </div>
          <div class="column linha0" style="display: flex">
            <div class="column is-size-3" v-if="model === 'detalhar'">
              <h1>Detalhes do Categoria</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de Categoria</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-one-fifth pl-0">
              <label class="label">ID</label>
              <input
                class="input"
                type="number"
                v-model="categoria.id"
                placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-half pl-0">
              <label class="label">Data</label>
              <input
                class="input"
                type="datetime"
                v-model="categoria.data"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
          </div>
          <div class="linha2 column is-12" style="display: flex">
            <div class="control column is-full pl-0">
              <label class="label">Nome do categoria</label>
              <input
                class="input"
                type="text"
                placeholder="Nome da categoria..."
                v-model="categoria.nome"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div
              class="opcoes column"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <button
                type="button"
                class="button"
                v-bind:class="[categoria.ativo == true ? 'ativo' : 'inativo']"
                @click="setStatus()"
              >
                {{ categoria.ativo == true ? "ATIVO" : "INATIVO" }}
              </button>
              <a type="button" href="/categoria-list" class="button voltar">
                CANCELAR
              </a>
              <button
                type="button"
                class="button salvar"
                @click="onClickCadastrar()"
              >
                SALVAR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <button
                class="button editar"
                @click="onClickPaginaEditar(categoria.id)"
              >
                EDITAR
              </button>
              <a href="/categoria-list" class="button"> VOLTAR </a>
              <button class="button excluir" @click="onClickDeletar">
                EXCLUIR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/categoria-list" class="button"> VOLTAR </a>
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
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.categoria.data = currentDate;
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
          "Error: " + error.data
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
          "Categoria foi Desativado com sucesso!"
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
          "Error: " + error.data
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
  public setStatus(): void {
    if (this.categoria.ativo == false) {
      this.categoria.ativo = true;
    } else {
      this.categoria.ativo = false;
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