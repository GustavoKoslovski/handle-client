<template>
  <div class="container">
    <div
      class="title-box columns is-12 title is-4"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <p style="margin-left: 15px">Fornecedor - Novo Registro</p>
    </div>

    <form class="form columns is-12">
      <div class="columns is-12 form-inputs">
        <div class="column is-12 is-size-3 form-inputs">
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12">
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
              <h1>Detalhes do Fornecedor</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de Fornecedor</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-one-fifth pl-0">
              <label class="label">ID</label>
              <input
                class="input"
                type="number"
                v-model="fornecedor.id"
                placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Data</label>
              <input
                class="input"
                type="datetime"
                v-model="fornecedor.data"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-half pl-0">
              <label class="label">Telefone</label>
              <input
                class="input"
                type="text"
                v-model="fornecedor.telefone"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha2 column is-12" style="display: flex">
            <div class="control column is-full pl-0">
              <label class="label">Nome do Fornecedor</label>
              <input
                class="input"
                type="text"
                placeholder="Nome do fornecedor..."
                v-model="fornecedor.nome"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex">
            <div class="control column is-full pl-0">
              <label class="label">Endereço do Fornecedor</label>
              <input
                class="input"
                type="text"
                placeholder="Ex: Rua, n°, Bairro, Cidade"
                v-model="fornecedor.endereco"
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
                v-bind:class="[fornecedor.ativo == true ? 'ativo' : 'inativo']"
                @click="setStatus()"
              >
                {{ fornecedor.ativo == true ? "ATIVO" : "INATIVO" }}
              </button>
              <a type="button" href="/fornecedor-list" class="button voltar">
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
                @click="onClickPaginaEditar(fornecedor.id)"
              >
                EDITAR
              </button>
              <a href="/fornecedor-list" class="button"> VOLTAR </a>
              <button class="button excluir" @click="onClickDeletar">
                EXCLUIR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/fornecedor-list" class="button"> VOLTAR </a>
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
import { Fornecedor } from "@/model/fornecedor";
import { Notification } from "@/model/notification";
import { FornecedorClient } from "@/client/fornecedor.client";

export default class fornecedorForm extends Vue {
  public fornecedorClient!: FornecedorClient;
  public fornecedor: Fornecedor = new Fornecedor();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public mounted(): void {
    this.fornecedorClient = new FornecedorClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.fornecedor.data = currentDate;
    this.carregarfornecedor();

    console.log(this.id);
    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.fornecedorClient.cadastrar(this.fornecedor).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "fornecedor cadastrado com sucesso!"
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
    this.fornecedorClient.desativar(this.fornecedor).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "fornecedor foi Desativado com sucesso!"
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

  public onClickPaginaEditar(idfornecedor: number) {
    this.$router.push({
      name: "fornecedor-editar",
      params: { id: idfornecedor, model: "editar" },
    });

  }

  public onClickSalvarAlteracao(): void {
    debugger;
    this.fornecedorClient.editar(this.fornecedor).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "fornecedor foi Editado com sucesso!"
        );
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.data
        );
        debugger;
      }
    );
  }

  public carregarfornecedor(): void {
    console.log("carregarfornecedor" + this.id);
    console.log("nome" + this.fornecedor.nome);
    this.fornecedorClient
      .findById(this.id)
      .then((value) => {
        this.fornecedor = value;
        console.log("fornecedor" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.fornecedor = new Fornecedor();
  }
  public setStatus(): void {
    if (this.fornecedor.ativo == false) {
      this.fornecedor.ativo = true;
    } else {
      this.fornecedor.ativo = false;
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