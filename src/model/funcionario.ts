import { AbstractEntity } from "./abstract-entity";

export class Funcionario extends AbstractEntity {
  nome!: string;
  rg!: string;
  cpf!: string;
  pis!: string;
  dataAdmissao!: Date;
  telefone!: string;
  salario!: number;

  constructor() {
    super();
    this.ativo = true;
  }
}
