import { AbstractEntity } from "./abstract-entity";

export class Cliente extends AbstractEntity {
  data!: string;
  nome!: string;
  cpf!: string;
  telefone!: string;

  constructor() {
    super();
    this.ativo = true;
  }
}
