import { AbstractEntity } from "./abstract-entity";
import { Produto } from "./produto";

export class MovimentoEstoque extends AbstractEntity {
  produto!: Produto;
  tipoMovimento!: boolean;
  data!: string;
  valor!: number;
  quantidadeTotal!: number;

  constructor() {
    super();
    this.ativo = true;
    this.produto = new Produto();
  }
}
