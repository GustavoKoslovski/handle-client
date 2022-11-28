<template>
  <div class="cliente-cadastro columns is-centered" style="margin-top: 2vh">
    <div
      class="column is-size-3"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <div class="column is-9 nomePageCadastro" style="color: black">
        <div class=""><img src="../imagens/user.png" /></div>
        <p style="margin-left: 10px">Cliente - Novo Registro</p>
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
              <h1>Detalhes do cliente</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de cliente</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-half">
              <label class="label">Nome:</label>
              <input
                class="input nome"
                type="text"
                v-model="cliente.nome"
                placeholder="Nome do cliente"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Cpf:</label>
              <input
                class="input codigo"
                type="text"
                v-model="cliente.cpf"
                placeholder="Apenas Números"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Telefone:</label>
              <input
                class="input"
                type="text"
                v-model="cliente.telefone"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex; margin-left: 12px">
            <label class="label">
              <input
                v-model="cliente.ativo"
                checked
                type="checkbox"
                :disabled="model === 'detalhar'"
              />
              Ativar cliente
            </label>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div
              class="opcoes column"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <a href="/cliente-list" class="button">Voltar</a>
              <button class="button salvar" @click="onClickCadastrar()">
                Salvar
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <a href="/cliente-list" class="button">Voltar</a>
              <button
                class="button editar"
                @click="onClickPaginaEditar(cliente.id)"
              >
                Editar
              </button>
              <button class="button excluir" @click="onClickDeletar">
                Excluir
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/cliente-list" class="button">Voltar</a>
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
          "cliente cadastrado com sucesso!"
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
          "Error: " + error
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
          "Error: " + error
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