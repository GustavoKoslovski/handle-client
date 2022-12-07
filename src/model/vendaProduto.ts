import { AbstractEntity } from "./abstract-entity";
import { Venda } from "./venda";
import { Produto } from "./produto";

export class VendaProduto extends AbstractEntity {
  venda!: Venda;
  produto!: Produto;
  quantidade!: number;
  precoUnitario!: number;
  precoFinal!: number;

  constructor() {
    super();
    this.venda = new Venda();
    this.produto = new Produto();
    this.ativo = true;
  }
}
