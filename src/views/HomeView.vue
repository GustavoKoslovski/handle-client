<template>
  <div class="home columns is-centered" style="margin-top: 100px">
    <div class="columns is-centered">
      <div class="column is-11 is-size-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import VueCharts from 'vue-chartjs'    
import { Bar } from 'vue-chartjs'


import { Produto } from "@/model/produto";
import { Notification } from "@/model/notification";
import { ProdutoClient } from "@/client/produto.client";
import { Categoria } from "@/model/categoria";

export default Bar.sd {
  extends: Bar,
  mounted() {
    this.renderChart(data, options);
  }
};

export default class ProdutoForm extends Vue {
  public produtoClient!: ProdutoClient;
  public produto: Produto = new Produto();
  public notification: Notification = new Notification();

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  @Prop({ type: String, default: false })
  readonly model!: string;

  public mounted(): void {
    this.produtoClient = new ProdutoClient();
    this.carregarProduto();

    console.log(this.id);
    console.log(this.model);
  }

  public onClickCadastrar(): void {
    this.produtoClient.cadastrar(this.produto).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Produto Cadastrado com sucesso!"
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
.item-relatorio {
  font-size: 18px;
  width: 14em;
  height: 5em;
  background: rgba(225, 234, 255, 0.953);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.item-relatorio h1 {
  margin-top: 15px;
  color: rgb(35, 35, 35);
}

.bloco1 {
  margin-bottom: 30px;
}

.bloco1,
.bloco2 {
  background: rgba(225, 234, 255, 0.953);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  width: 35em;
  height: 8em;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-around;
}

.fundo {
  background: rgba(225, 234, 255, 0.953);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  width: 70em;
  height: 35em;
  border-radius: 40px;
}

.control .input {
  background: rgba(225, 234, 255, 0.953);
  color: #fff;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}

.opcoes a,
.opcoes button {
  margin-right: 22px;
  border-radius: 10px;
}

.opcoes a,
.opcoes button {
  background: rgba(46, 85, 181, 0.44);

  color: #fff;

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(237, 176, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}

.opcoes a {
  background-color: #d4d4d4;
}

.opcoes a:hover {
  color: #fff;
  background-color: #d4d4d4;
}

.opcoes .salvar {
  background-color: #d4d4d4;
}

.opcoes .salvar:hover {
  color: #fff;
  background-color: #d4d4d4;
}

.opcoes .editar {
  background-color: #d4d4d4;
}

.opcoes .editar:hover {
  color: #fff;
  background-color: #d4d4d4;
}

.opcoes .excluir {
  background-color: #d4d4d4;
}

.opcoes .excluir:hover {
  color: #fff;
  background-color: #d4d4d4;
}
</style>