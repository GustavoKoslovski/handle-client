import { AbstractEntity } from "./abstract-entity";
import { MovimentoEstoque } from "./movimentoEstoque";
import { Produto } from "./produto";

export class MovEstoqueProduto extends AbstractEntity {
  produto!: Produto;
  movimentoEstoque!: MovimentoEstoque;
  quantidade!: number;
  precoUnitario!: number;
  precoFinal!: number;

  constructor() {
    super();
    this.ativo = true;
    this.produto = new Produto();
    this.movimentoEstoque = new MovimentoEstoque();
  }
}
