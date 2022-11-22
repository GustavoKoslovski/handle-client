import { AbstractEntity } from "./abstract-entity";

export class movimentoEstoque extends AbstractEntity {
  tipoMovimento!: boolean;
  data!: Date;
  valor!: number;
  quantidadeTotal!: number;

  constructor() {
    super();
    this.ativo = true;
  }
}
