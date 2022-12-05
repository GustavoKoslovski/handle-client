<template>
  <div class="container">
    <div
      class="title-box columns is-12 title is-4"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <p style="margin-left: 15px">Cliente - Novo Registro</p>
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
              <h1>Detalhes do Cliente</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de Cliente</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-one-fifth pl-0">
              <label class="label">ID</label>
              <input
                class="input"
                type="number"
                v-model="cliente.id"
                placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Data</label>
              <input
                class="input"
                type="datetime"
                v-model="cliente.data"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">CPF</label>
              <input
                class="input"
                type="text"
                placeholder="Apenas números"
                v-model="cliente.cpf"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha2 column is-12" style="display: flex">
            <div class="control column is-two-fifths">
              <label class="label">Telefone</label>
              <input
                class="input"
                type="text"
                v-model="cliente.telefone"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex">
            <div class="control column is-full pl-0">
              <label class="label">Nome do cliente</label>
              <input
                class="input"
                type="text"
                placeholder="Nome do cliente..."
                v-model="cliente.nome"
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
                v-bind:class="[cliente.ativo == true ? 'ativo' : 'inativo']"
                @click="setStatus()"
              >
                {{ cliente.ativo == true ? "ATIVO" : "INATIVO" }}
              </button>
              <a type="button" href="/cliente-list" class="button voltar">
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
                @click="onClickPaginaEditar(cliente.id)"
              >
                EDITAR
              </button>
              <a href="/cliente-list" class="button"> VOLTAR </a>
              <button class="button excluir" @click="onClickDeletar">
                EXCLUIR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/cliente-list" class="button"> VOLTAR </a>
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
import { Cliente } from "@/model/cliente";
import { Notification } from "@/model/notification";
import { ClienteClient } from "@/client/cliente.client";

export default class ClienteForm extends Vue {
  public clienteClient!: ClienteClient;
  public cliente: Cliente = new Cliente();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public mounted(): void {
    this.clienteClient = new ClienteClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.cliente.data = currentDate;
    this.carregarcliente();

    console.log(this.id);
    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.clienteClient.cadastrar(this.cliente).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Cliente cadastrado com sucesso!"
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
    this.clienteClient.desativar(this.cliente).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "cliente foi Desativado com sucesso!"
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

  public onClickPaginaEditar(idcliente: number) {
    this.$router.push({
      name: "cliente-editar",
      params: { id: idcliente, model: "editar" },
    });
    console.log("ta chamando");
  }

  public onClickSalvarAlteracao(): void {
    this.clienteClient.editar(this.cliente).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "cliente foi Editado com sucesso!"
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

  public carregarcliente(): void {
    console.log("carregarcliente" + this.id);
    console.log("nome" + this.cliente.nome);
    this.clienteClient
      .findById(this.id)
      .then((value) => {
        this.cliente = value;
        console.log("cliente" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.cliente = new Cliente();
  }
  public setStatus(): void {
    if (this.cliente.ativo == false) {
      this.cliente.ativo = true;
    } else {
      this.cliente.ativo = false;
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