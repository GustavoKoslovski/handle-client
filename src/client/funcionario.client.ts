import axios, { AxiosInstance } from "axios";

import { Funcionario } from "@/model/funcionario";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export class FuncionarioClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/funcionarios',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<Funcionario> {
        try {
            return (await this.axiosClient.get<Funcionario>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(funcionario: Funcionario): Promise<void> {
		try {
			return (await this.axiosClient.post('/', funcionario))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(funcionario: Funcionario): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${funcionario.id}`, funcionario)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(funcionario: Funcionario): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${funcionario.id}`, funcionario)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Funcionario>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Funcionario>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}