import { AbstractEntity } from "./abstract-entity";
import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";

export class Venda extends AbstractEntity {
  data!: Date;
  valorRecebido!: number;
  valorTotal!: number;
  valorTroco!: number;
  valorDesconto!: number;
  valorFinal!: number;
  cliente!: Cliente;
  funcionaio!: Funcionario;

  constructor() {
    super();
    this.ativo = true;
  }
}
