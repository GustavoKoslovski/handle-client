import axios, { AxiosInstance } from "axios";

import { Cliente } from "@/model/cliente";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";


export class ClienteClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/clientes',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<Cliente> {
        try {
            return (await this.axiosClient.get<Cliente>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(cliente: Cliente): Promise<void> {
		try {
			return (await this.axiosClient.post('/', cliente))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(cliente: Cliente): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${cliente.id}`, cliente)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(cliente: Cliente): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${cliente.id}`, cliente)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Cliente>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Cliente>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}