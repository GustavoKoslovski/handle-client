import { AbstractEntity } from "./abstract-entity";

export class Categoria extends AbstractEntity{

    nome! : string

    constructor() {
        super()
        this.ativo = true
    }
}