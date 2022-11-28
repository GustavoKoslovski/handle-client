import { AbstractEntity } from "./abstract-entity";
import { Produto } from "./produto";

export class MovEstoqueProduto extends AbstractEntity {
  produto!: Produto;
  movimentoEstoque!: boolean;
  quantidade!: number;

  constructor() {
    super();
    this.ativo = true;
    this.produto = new Produto();
  }
}
