<template>
  <div
    class="funcionario-cadastro columns is-centered"
    style="margin-top: 100px"
  >
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
              <h1>Detalhes do funcionario</h1>
            </div>
            <div
              class="column is-size-3"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <h1>Cadastro de funcionario</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de funcionario</h1>
            </div>
          </div>
          <div class="linha1 column" style="display: flex">
            <div class="control column is-half">
              <label class="label">Nome:</label>
              <input
                class="input nome"
                type="text"
                v-model="funcionario.nome"
                placeholder="Nome do funcionario"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Cpf:</label>
              <input
                class="input codigo"
                type="text"
                v-model="funcionario.cpf"
                placeholder="Apenas Números"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">RG:</label>
              <input
                class="input"
                type="text"
                v-model="funcionario.rg"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha2 column" style="display: flex">
            <div class="control column is-one-quarter">
              <label class="label">Telefone:</label>
              <input
                class="input"
                type="text"
                v-model="funcionario.telefone"
                placeholder="Telefone"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Data de contratação:</label>
              <input
                class="input"
                style="color-scheme: dark"
                type="date"
                v-model="funcionario.dataAdmissao"
                placeholder=""
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">PIS:</label>
              <input
                class="input"
                type="text"
                v-model="funcionario.pis"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
            <div class="control column is-one-quarter">
              <label class="label">Salario:</label>
              <input
                class="input"
                type="text"
                v-model="funcionario.salario"
                placeholder="Apenas números"
                :disabled="model === 'detalhar'"
              />
            </div>
          </div>
          <div class="linha3 column" style="display: flex; margin-left: 12px">
            <label class="label">
              <input
                v-model="funcionario.ativo"
                checked
                type="checkbox"
                :disabled="model === 'detalhar'"
              />
              Ativar funcionario
            </label>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div
              class="opcoes column"
              v-if="model != 'detalhar' && model != 'editar'"
            >
              <a href="/funcionario-list" class="button">Voltar</a>
              <button class="button salvar" @click="onClickCadastrar()">
                Salvar
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'detalhar'">
              <a href="/funcionario-list" class="button">Voltar</a>
              <button
                class="button editar"
                @click="onClickPaginaEditar(funcionario.id)"
              >
                Editar
              </button>
              <button class="button excluir" @click="onClickDeletar">
                Excluir
              </button>
            </div>
            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/funcionario-list" class="button">Voltar</a>
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

import { Funcionario } from "@/model/funcionario";
import { Notification } from "@/model/notification";
import { FuncionarioClient } from "@/client/funcionario.client";

export default class ProdutoForm extends Vue {
  public funcionarioClient!: FuncionarioClient;
  public funcionario: Funcionario = new Funcionario();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public mounted(): void {
    this.funcionarioClient = new FuncionarioClient();
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