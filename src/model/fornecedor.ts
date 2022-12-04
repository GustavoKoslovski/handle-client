import { AbstractEntity } from "./abstract-entity";

export class Fornecedor extends AbstractEntity {
  data!: string;
  nome!: string;
  telefone!: string;
  endereco!: string;

  constructor() {
    super();
    this.ativo = true;
  }
}
