<template>
  <div class="container">
    <div
      class="title-box columns is-12 title is-4"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <p style="margin-left: 15px">Venda - Novo Registro</p>
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
              <h1>Detalhes do Venda</h1>
            </div>
            <div class="column is-size-3" v-if="model === 'editar'">
              <h1>Edição de Venda</h1>
            </div>
          </div>
          <div class="linha1 columns is-12 m-0 p-0">
            <div class="control column is-one-fifth pl-0">
              <label class="label">ID</label>
              <input
                class="input"
                type="number"
                v-model="venda.id"
                placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Data</label>
              <input
                class="input"
                type="datetime"
                v-model="venda.data"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Vendedor</label>
              <select
                class="input"
                id="funcionario"
                v-model="venda.funcionario.id"
              >
                <option value="" disabled selected>Lista de Vendedores</option>
                <option
                  v-for="item in funcionarioList"
                  v-bind:key="item.id"
                  v-bind:value="item.id"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
            <div class="control column is-two-fifths">
              <label class="label">Cliente</label>
              <select class="input" id="cliente" v-model="venda.cliente.id">
                <option value="" disabled selected>Lista de Clientes</option>
                <option
                  v-for="item in clienteList"
                  v-bind:key="item.id"
                  v-bind:value="item.id"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="linha2 columns is-8 m-0 p-0">
            <div class="control column is-half">
              <label class="label">Produto</label>
              <select
                class="input"
                id="vendaProduto"
                v-model="vendaProduto.produto"
              >
                <option value="" disabled selected>Lista de Produtos</option>
                <option
                  v-for="item in produtoList"
                  v-bind:key="item.id"
                  v-bind:value="item"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
            <div>
              <button
                type="button"
                class="button salvar"
                @click="onClickAdicionarProduto(vendaProduto)"
              >
                +
              </button>
            </div>
          </div>
          <div class="linha3 columns is-8 m-0 p-0">
            <div class="column is-12 table-produtos">
              <table class="table-list-produtos">
                <tbody>
                  <tr v-for="item in vendaProdutoList" :key="item.id">
                    <th>{{ item.produto.nome }}</th>
                    <th>{{ item.produto.valorVenda }}</th>
                    <th>
                      <button
                        type="button"
                        @click="setQuantidade('-')"
                        class="botao menos"
                      >
                        -
                      </button>
                      {{ item.quantidade }}
                      <button
                        type="button"
                        @click="setQuantidade('+')"
                        class="botao mais"
                      >
                        +
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="linha4 column" style="display: flex; margin-top: 10px">
            <div>
              <div class="venda-linha1 columns is-6 m-0 p-0">
                <div class="control column is-half pl-0">
                  <label class="label">Total</label>
                  <input
                    class="input"
                    type="number"
                    v-model="venda.valorTotal"
                    placeholder="000"
                    :disabled="model === 'detalhar' || model != 'detalhar'"
                  />
                </div>
                <div class="control column is-half pl-0">
                  <label class="label">Desconto</label>
                  <input
                    class="input"
                    type="number"
                    v-model="venda.valorDesconto"
                    placeholder="000"
                    :disabled="model === 'detalhar' || model != 'detalhar'"
                  />
                </div>
              </div>
              <div class="venda-linha2 columns is-6 m-0 p-0">
                <div class="control column is-half pl-0">
                  <label class="label">Total final</label>
                  <input
                    class="input"
                    type="number"
                    v-model="venda.valorFinal"
                    placeholder="000"
                    :disabled="model === 'detalhar' || model != 'detalhar'"
                  />
                </div>
              </div>
              <div class="venda-linha3 columns is-6 m-0 p-0">
                <div class="control column is-half pl-0">
                  <label class="label">Recebido</label>
                  <input
                    class="input"
                    type="number"
                    v-model="venda.valorRecebido"
                    placeholder="000"
                    :disabled="model === 'detalhar' || model != 'detalhar'"
                  />
                </div>
                <div class="control column is-half pl-0">
                  <label class="label">Troco</label>
                  <input
                    class="input"
                    type="number"
                    v-model="venda.valorTroco"
                    placeholder="000"
                    :disabled="model === 'detalhar' || model != 'detalhar'"
                  />
                </div>
              </div>
              <div class="venda-linha4 columns is-6 m-0 p-0">
                <div class="control column is-full pl-0">
                  <label class="label">Forma de pagamento</label>
                  <select class="input" id="cliente" v-model="venda.cliente.id">
                    <option value="Forma de Pagamento" disabled selected>
                      Lista de formas
                    </option>
                    <option
                      v-for="item in clienteList"
                      v-bind:key="item.id"
                      v-bind:value="item.id"
                    >
                      {{ item.nome }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="venda-linha5 columns is-6 m-0 p-0">
                <div
                  class="opcoes column"
                  v-if="model != 'detalhar' && model != 'editar'"
                >
                  <a type="button" href="/venda-list" class="button voltar">
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
              </div>
            </div>

            <div class="opcoes column" v-if="model === 'editar'">
              <a href="/venda-list" class="button"> VOLTAR </a>
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

import { Venda } from "@/model/venda";
import { Notification } from "@/model/notification";
import { VendaClient } from "@/client/venda.client";
import { ClienteClient } from "@/client/cliente.client";
import { FuncionarioClient } from "@/client/funcionario.client";
import { ProdutoClient } from "@/client/produto.client";
import { Produto } from "@/model/produto";
import { Funcionario } from "@/model/funcionario";
import { Cliente } from "@/model/cliente";
import { AbstractEntity } from "@/model/abstract-entity";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { VendaProduto } from "@/model/vendaProduto";
import { VendaProdutoClient } from "@/client/vendaProduto.client";

export default class vendaForm extends Vue {
  public abstractEntity: AbstractEntity = new AbstractEntity();
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Cliente> = new PageResponse();
  public pageResponse2: PageResponse<Funcionario> = new PageResponse();
  public pageResponse3: PageResponse<Produto> = new PageResponse();
  public pageResponse4: PageResponse<VendaProduto> = new PageResponse();

  public clienteList: Cliente[] = [];
  public funcionarioList: Funcionario[] = [];
  public clienteClient!: ClienteClient;
  public funcionarioClient!: FuncionarioClient;
  public produtoList: Produto[] = [];
  public produtoClient!: ProdutoClient;
  public vendaClient!: VendaClient;
  public venda: Venda = new Venda();
  public vendaProduto: VendaProduto = new VendaProduto();
  public vendaProdutoList: VendaProduto[] = [];
  public vendaProdutoClient!: VendaProdutoClient;
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public listarCliente(): void {
    this.clienteClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.clienteList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public listarFuncionario(): void {
    this.funcionarioClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse2 = success;
        this.funcionarioList = this.pageResponse2.content;
      },
      (error) => console.log(error)
    );
  }

  public listarProduto(): void {
    this.produtoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse3 = success;
        this.produtoList = this.pageResponse3.content;
      },
      (error) => console.log(error)
    );
  }

  public listarVendaProduto(): void {
    this.vendaProdutoClient.findByFiltrosPaginado(this.pageRequest).then(
      (success) => {
        this.pageResponse4 = success;
        this.vendaProdutoList = this.pageResponse4.content;
      },
      (error) => console.log(error)
    );
  }

  public mounted(): void {
    this.clienteClient = new ClienteClient();
    this.listarCliente();
    this.funcionarioClient = new FuncionarioClient();
    this.listarFuncionario();
    this.produtoClient = new ProdutoClient();
    this.listarProduto();
    this.vendaProdutoClient = new VendaProdutoClient();
    this.listarVendaProduto();
    this.vendaClient = new VendaClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.venda.data = currentDate;
    this.carregarVenda();

    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.vendaClient.cadastrar(this.venda).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "venda Cadastrado com sucesso!"
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
    this.vendaProdutoList.forEach((element) => {
      this.vendaProdutoClient.cadastrar(element);
    });
  }

  public onClickAdicionarProduto(vendaProduto: VendaProduto): void {
    debugger;
    vendaProduto.venda = this.venda;
    vendaProduto.produto = this.vendaProduto.produto;
    vendaProduto.precoUnitario = this.vendaProduto.produto.valorVenda;
    vendaProduto.precoFinal = this.vendaProduto.precoFinal;
    vendaProduto.quantidade = 0;
    this.vendaProdutoList.push(vendaProduto);
  }

  public onClickDeletar(): void {
    this.vendaClient.desativar(this.venda).then(
      (sucess) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "venda foi Desativado com sucesso!"
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

  public onClickPaginaEditar(idvenda: number) {
    this.$router.push({
      name: "venda-editar",
      params: { id: idvenda, model: "editar" },
    });
    console.log("ta chamando");
  }

  public onClickSalvarAlteracao(): void {
    this.vendaClient.editar(this.venda).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "venda foi Editado com sucesso!"
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

  public carregarVenda(): void {
    this.vendaClient
      .findById(this.id)
      .then((value) => {
        this.venda = value;
        this.venda.data = moment(this.venda.cadastro).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        console.log("venda" + value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onClickFecharNotificacao(): void {
    this.notification = new Notification();
  }

  public onClickLimpar(): void {
    this.venda = new Venda();
  }

  public setStatus(): void {
    if (this.venda.ativo == false) {
      this.venda.ativo = true;
    } else {
      this.venda.ativo = false;
    }
  }

  public setQuantidade(sinal: string): void {
    debugger;
    if (sinal == "-") {
      if (this.vendaProduto.quantidade != 0) {
        this.vendaProduto.quantidade--;
      }
    } else {
      this.vendaProduto.quantidade++;
    }
  }

  // public formatCurrency(): void {
  //   debugger;
  //   console.log(this.venda.valorVenda)
  //   this.venda.valorVenda = Number(this.venda.valorVenda).toFixed(2);
  //   console.log(this.venda.valorVenda)
  // }

  // private created(): void { }
}
</script>
  
<style>
.pesquisa-bar {
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
}

.pesquisaVenda .input {
  border-radius: 7px 0px 0px 7px;
  background: #d4d4d4;
}

.table-produtos {
  width: 100%;
  background-color: #eaeaea;
  margin-top: 5px;
  justify-content: space-between;
}

.table-list-produtos {
  width: 100%;
  background: #d4d4d4;
  border-radius: 7px;
  justify-content: space-between;
}

.pesquisaVenda {
  width: 100%;
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