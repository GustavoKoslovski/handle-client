import { AbstractEntity } from "./abstract-entity";
import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";

export class Venda extends AbstractEntity {
  data2!: string;
  data!: Date;
  valorRecebido!: number;
  valorTotal!: number;
  valorTroco!: number;
  valorDesconto!: number;
  valorFinal!: number;
  cliente!: Cliente;
  funcionario!: Funcionario;

  constructor() {
    super();
    this.ativo = true;
    this.cliente = new Cliente();
    this.funcionario = new Funcionario();
  }
}
