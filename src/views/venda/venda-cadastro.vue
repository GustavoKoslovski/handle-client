<template>
  <div class="container">
    <div
      class="title-box columns is-12 title is-4"
      v-if="model != 'detalhar' && model != 'editar'"
    >
      <p style="margin-left: 15px">Venda - Novo Registro</p>
    </div>

    <form class="form columns is-12 mt-4">
      <div class="columns is-12 form-inputs">
        <div class="column is-12 is-size-3 form-inputs pr-0">
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
          <div class="linha1 columns is-12 m-0 pl-0 pr-0">
            <div class="control column is-2 pl-0">
              <label class="label">ID</label>
              <input
                class="input"
                id="id"
                type="number"
                placeholder="000"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column is-3">
              <label class="label">Data</label>
              <input
                class="input"
                id="cadastro"
                v-model="venda.data"
                type="datetime"
                :disabled="model === 'detalhar' || model != 'detalhar'"
              />
            </div>
            <div class="control column">
              <label class="label">Vendedor</label>
              <select
                class="input"
                id="funcionario"
                v-model="venda.funcionario"
              >
                <option value="" disabled selected>Lista de Vendedores</option>
                <option
                  v-for="item in funcionarioList"
                  v-bind:key="item.id"
                  v-bind:value="item"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
            <div class="control column pr-0">
              <label class="label">Cliente</label>
              <select class="input" id="cliente" v-model="venda.cliente">
                <option value="" disabled selected>Lista de Clientes</option>
                <option
                  v-for="item in clienteList"
                  v-bind:key="item.id"
                  v-bind:value="item"
                >
                  {{ item.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="linha2 columns is-12 pr-0">
            <div class="produto column is-7 pr-0">
              <div class="column is-12">
                <label class="label">Produto</label>
                <div class="control" style="display: flex;">
                  <select
                  class="input "
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
                  <button
                    type="button"
                    class="button adicionar"
                    @click="onClickAdicionarProduto(vendaProduto)"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="column is-12 prod-table-body">
                <div class="prod-table-row" v-for="(item, index) in vendaProdutoList" :key="item.id">
                  <div class="prod-table-cell" style="width: 60%; margin-left: 2.5%"><p>{{item.produto.nome}}</p></div>
                  <div class="prod-table-cell" style="width: 30%;"><p> R$ {{ item.precoFinal }}</p></div>
                  <div class="prod-table-cell" style="width: 10%;">
                    <button type="button" @click="setQuantidade('-', index)" class="botao menos">
                      -
                    </button>
                      {{ item.quantidade }}
                    <button type="button" @click="setQuantidade('+', index)" class="botao mais">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="valores column is-5 pr-0">
              <div class="column is-12 pl-0 pr-0">
                <div class="venda-linha1 columns is-6 m-0 p-0">
                  <div class="control column is-6 pl-0">
                    <label class="label">Total</label>
                    <input
                      class="input"
                      type="number"
                      v-model="venda.valorTotal"
                      placeholder="000"
                      :disabled="model === 'detalhar' || model != 'detalhar'"
                    />
                  </div>
                  <div class="control column is-6 pl-0">
                    <label class="label">Desconto</label>
                    <input
                      class="input"
                      type="number"
                      v-model="venda.valorDesconto"
                      placeholder="000"
                      v-on:change="calculaValoresVenda(vendaProduto)"
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
                      v-on:change="calculaValoresVenda(vendaProduto)"
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
                <!-- <div class="venda-linha4 columns is-6 m-0 p-0">
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
                </div> -->
                <div class="venda-linha5 columns is-6 m-0 p-0">
                  <div class="column is-6 pl-0">
                    <!-- <a type="button" href="/venda-list" class="button voltar">
                      CANCELAR
                    </a> -->
                    <button
                      type="button"
                      class="button voltar-venda"
                      @click="onClickCancelar()"
                    >
                      CANCELAR
                    </button>
                  </div>
                  <div class="column is-6 pl-0">
                    <button
                      type="button"
                      class="button salvar-venda"
                      @click="onClickCadastrar()"
                    >
                      SALVAR
                    </button>
                  </div>
                </div>
              </div>
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
import { MovimentoEstoqueClient } from "@/client/movimentoEstoque.client";
import { MovimentoEstoque } from "@/model/movimentoEstoque";

export default class vendaForm extends Vue {
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
  public movimentoEstoqueClient!: MovimentoEstoqueClient;
  public movimentoEstoque!: MovimentoEstoque;
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
    this.vendaClient = new VendaClient();
    this.movimentoEstoqueClient = new MovimentoEstoqueClient();
    var currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.venda.data = currentDate;
    this.movimentoEstoque = new MovimentoEstoque();
    this.movimentoEstoque.quantidadeTotal = 0;
    this.movimentoEstoque.data = this.venda.data;
    
  }

  public onClickCadastrar(): void {
    this.vendaClient.cadastrar(this.venda).then(
      (success) => {
        if(success != null){
          
          this.vendaProdutoList.map((produto) => {
            produto.venda = success;
            this.movimentoEstoque.quantidadeTotal += produto.quantidade;
            this.movimentoEstoque.valor = this.venda.valorTotal;
            this.vendaProdutoClient.cadastrar(produto);
            produto.produto.quantidade -= produto.quantidade
            this.produtoClient.editar(produto.produto)
          });

          this.movimentoEstoque.tipoMovimento = false;
          
          this.movimentoEstoqueClient.cadastrar(this.movimentoEstoque);

        }
        
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Venda realizada com sucesso!"
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
    console.log(this.venda);
    console.log(this.vendaProdutoList);
    
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

  public onClickCancelar(): void {
    this.$router.push("venda-list");
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

  public setQuantidade(sinal: string, index: number): void {
    
    if (sinal == "-") {
      if (this.vendaProdutoList[index].quantidade != 1) {
        this.vendaProdutoList[index].quantidade--;
        this.vendaProdutoList[index].precoFinal = this.vendaProdutoList[index].precoUnitario * this.vendaProdutoList[index].quantidade;
        this.venda.valorTotal -= this.vendaProdutoList[index].precoUnitario;
      } else {
        this.venda.valorTotal -= this.vendaProdutoList[index].precoUnitario;
        this.vendaProdutoList.splice(index , 1)
      }
    } else {
      this.vendaProdutoList[index].quantidade++;
      this.vendaProdutoList[index].precoFinal = this.vendaProdutoList[index].precoUnitario * this.vendaProdutoList[index].quantidade;
      this.venda.valorTotal += this.vendaProdutoList[index].precoUnitario;
    }
    this.calculaValoresVenda(this.vendaProdutoList[index]);  
  }

  public onClickAdicionarProduto(vendaProdutoNew: VendaProduto): void {
    
    if(vendaProdutoNew.produto.id != null){
      vendaProdutoNew = new VendaProduto();
      vendaProdutoNew.quantidade = 1;
      vendaProdutoNew.venda = this.venda;
      vendaProdutoNew.produto = this.vendaProduto.produto;
      vendaProdutoNew.precoUnitario = this.vendaProduto.produto.valorVenda;
      vendaProdutoNew.precoFinal = vendaProdutoNew.precoUnitario * vendaProdutoNew.quantidade;
      if(this.venda.valorTotal == null){
        this.venda.valorTotal = 0;
        this.venda.valorDesconto = 0;
        this.venda.valorFinal = 0;
        this.venda.valorRecebido = 0;
        this.venda.valorTroco = 0;
      }
      this.venda.valorTotal += vendaProdutoNew.precoFinal;
    
      this.calculaValoresVenda(vendaProdutoNew);
      
      this.vendaProdutoList.push(vendaProdutoNew);
    }
  }

  public calculaValoresVenda(vendaProdutoNew: VendaProduto): void {
  
      this.venda.valorFinal = this.venda.valorTotal - this.venda.valorDesconto;
  
      if(this.venda.valorRecebido > 0){
        this.venda.valorTroco = this.venda.valorRecebido - this.venda.valorFinal
      }
  }
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

.table-list-produtos {
  width: 100%;
  background: #d4d4d4;
  border-radius: 7px;
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
  width: 100%;
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

.produto{
  padding-left: 0 !important;
}

.adicionar{
  background-color: #1271ff;
  color: #fff
}

.adicionar:hover{
  background-color: #68a4ff;
  color: #fff
}

.prod-table-body{
  width: 90%;
  height: 400px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 20px;
  overflow-y: auto;
}

.prod-table-row{
  width: 100%;
  min-height: 40px;
  background: #d4d4d4;
  display: flex;
  align-items: center;
  border-radius: 7px;
  font-size: 20px;
  /* margin-top: 10p;s */
  margin-bottom: 10px;
  box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.19);
}

/* width */
.prod-table-body::-webkit-scrollbar {
  width: 40px;
}
  
  /* Track */
.prod-table-body::-webkit-scrollbar-track {
  background: #d4d4d4;
  border-radius: 10px;
}
  
  /* Handle */
.prod-table-body::-webkit-scrollbar-thumb {
  background: #B1B1B1;
  border-radius: 10px;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.10);
}
  
  /* Handle on hover */
.prod-table-body::-webkit-scrollbar-thumb:hover {
  background: #a8a6a0;
}

::placeholder {
  color: rgb(255, 255, 255);
}

::-webkit-input-placeholder {
  /* Chrome */
  color: rgb(255, 255, 255);
}

.ativo-venda,
.salvar-venda {
  width:100%;
  color: #fff !important;
  border-radius: 7px !important;
  background-color: #1bc856 !important;
}

.voltar-venda,
.inativo-venda {
  width:100%;
  color: #fff !important;
  border-radius: 7px !important;
  background-color: #e51a1a !important;
}

.voltar-venda:hover,
.inativo-venda:hover {
  color: #fff;
  background-color: #ff5353 !important;
  border: solid 1px #ff5353;
}

.salvar-venda:hover,
.ativo-venda:hover {
  color: #fff;
  background-color: #34f374 !important;
  border: solid 1px #34f374;
}

</style>