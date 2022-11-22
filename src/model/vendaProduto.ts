import { AbstractEntity } from "./abstract-entity";
import { Venda } from "./venda";
import { Produto } from "./produto";

export class vendaProduto extends AbstractEntity {
  venda!: Venda;
  produto!: Produto;
  quantidade!: number;
  precoUnitario!: number;
  precoFinal!: number;

  constructor() {
    super();
    this.ativo = true;
  }
}
