<template>
  <div class="container">
    <div
      class="title-box columns is-12 title is-4"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <p style="margin-left: 15px">Funcionario - Novo Registro</p>
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
              <h1>Detalhes do Funcionario</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de Funcionario</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-one-fifth pl-0">
              <label class="label">ID</label>
              <input
                class="input"
                type="number"
                v-model="funcionario.id"
                placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Data</label>
              <input
                class="input"
                type="datetime"
                v-model="funcionario.data"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">CPF</label>
              <input
                class="input"
                type="text"
                placeholder="Apenas números"
                v-model="funcionario.cpf"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">RG</label>
              <input
                class="input"
                type="text"
                placeholder="Apenas números"
                v-model="funcionario.rg"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha2 column is-12" style="display: flex">
            <div class="control column is-full pl-0">
              <label class="label">Nome</label>
              <input
                class="input"
                type="text"
                placeholder="Nome do funcionário..."
                v-model="funcionario.nome"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">PIS</label>
              <input
                class="input"
                type="text"
                placeholder="Apenas números"
                v-model="funcionario.pis"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex">
            <div class="control column is-two-fifths">
              <label class="label">Data de contratação</label>
              <input
                class="input"
                type="date"
                v-model="funcionario.dataAdmissao"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-half pl-0">
              <label class="label">Telefone</label>
              <input
                class="input"
                type="text"
                v-model="funcionario.telefone"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-half pr-0">
              <label class="label">Salário</label>
              <input
                class="input"
                type="text"
                v-model="funcionario.salario"
                placeholder="R$: 00,00"
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
                v-bind:class="[funcionario.ativo == true ? 'ativo' : 'inativo']"
                @click="setStatus()"
              >
                {{ funcionario.ativo == true ? "ATIVO" : "INATIVO" }}
              </button>
              <a type="button" href="/Funcionario-list" class="button voltar">
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
                @click="onClickPaginaEditar(funcionario.id)"
              >
                EDITAR
              </button>
              <a href="/Funcionario-list" class="button"> VOLTAR </a>
              <button class="button excluir" @click="onClickDeletar">
                EXCLUIR
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/Funcionario-list" class="button"> VOLTAR </a>
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

import { Funcionario } from "@/model/funcionario";
import { Notification } from "@/model/notification";
import { FuncionarioClient } from "@/client/funcionario.client";

export default class FuncionarioForm extends Vue {
  public funcionarioClient!: FuncionarioClient;
  public funcionario: Funcionario = new Funcionario();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public mounted(): void {
    this.funcionarioClient = new FuncionarioClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.funcionario.data = currentDate;
    this.carregarFuncionario();

    console.log(this.id);
    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.funcionarioClient.cadastrar(this.funcionario).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Funcionario cadastrado com sucesso!"
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
    this.funcionarioClient.desativar(this.funcionario).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Funcionario foi Desativado com sucesso!"
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

  public onClickPaginaEditar(idFuncionario: number) {
    this.$router.push({
      name: "funcionario-editar",
      params: { id: idFuncionario, model: "editar" },
    });
    console.log("ta chamando");
  }

  public onClickSalvarAlteracao(): void {
    this.funcionarioClient.editar(this.funcionario).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Funcionario foi Editado com sucesso!"
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

  public carregarFuncionario(): void {
    console.log("carregarFuncionario" + this.id);
    console.log("nome" + this.funcionario.nome);
    this.funcionarioClient
      .findById(this.id)
      .then((value) => {
        this.funcionario = value;
        console.log("funcionario" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.funcionario = new Funcionario();
  }

  public setStatus(): void {
    if (this.funcionario.ativo == false) {
      this.funcionario.ativo = true;
    } else {
      this.funcionario.ativo = false;
    }
  }
}
</script>

<style>
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