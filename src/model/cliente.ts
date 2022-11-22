import { AbstractEntity } from "./abstract-entity";

export class Cliente extends AbstractEntity{

    nome! : string
    cpf!: string
    telefone!: string

    constructor() {
        super()
        this.ativo = true
    }
}