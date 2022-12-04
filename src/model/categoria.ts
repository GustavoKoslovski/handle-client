import { AbstractEntity } from "./abstract-entity";

export class Categoria extends AbstractEntity {
  data!: string;
  nome!: string;

  constructor() {
    super();
    this.ativo = true;
  }
}
