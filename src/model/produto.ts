import { AbstractEntity } from "./abstract-entity";
import { Categoria } from "./categoria";
import { Fornecedor } from "./fornecedor";

export class Produto extends AbstractEntity {
  data!: string;
  nome!: string;
  categoria!: Categoria;
  fornecedor!: Fornecedor;
  codigoDeBarras!: string;
  valorCusto!: number;
  valorVenda!: number;
  quantidade!: number;

  constructor() {
    super();
    this.categoria = new Categoria();
    this.fornecedor = new Fornecedor();
    this.ativo = true;
  }
}
