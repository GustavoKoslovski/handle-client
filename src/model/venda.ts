import { AbstractEntity } from "./abstract-entity";
import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";
import { VendaProduto } from "./vendaProduto";

export class Venda extends AbstractEntity {
  data!: string;
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
