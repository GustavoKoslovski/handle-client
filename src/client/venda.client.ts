import axios, { AxiosInstance } from "axios";

import { Venda } from "@/model/venda";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";


export class VendaClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/vendas',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<Venda> {
        try {
            return (await this.axiosClient.get<Venda>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(venda: Venda): Promise<void> {
		try {
			return (await this.axiosClient.post('/', venda))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(venda: Venda): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${venda.id}`, venda)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(venda: Venda): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${venda.id}`, venda)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Venda>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Venda>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}