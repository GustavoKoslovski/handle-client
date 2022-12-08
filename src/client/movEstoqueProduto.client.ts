import axios, { AxiosInstance } from "axios";

import { MovEstoqueProduto } from "@/model/movEstoqueProduto";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";


export class MovEstoqueProdutoClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/mov_estoque_produto',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<MovEstoqueProduto> {
        try {
            return (await this.axiosClient.get<MovEstoqueProduto>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(movEstoqueProduto: MovEstoqueProduto): Promise<void> {
		try {
			return (await this.axiosClient.post('/', movEstoqueProduto))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(movEstoqueProduto: MovEstoqueProduto): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${movEstoqueProduto.id}`, movEstoqueProduto)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(movEstoqueProduto: MovEstoqueProduto): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${movEstoqueProduto.id}`, movEstoqueProduto)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<MovEstoqueProduto>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<MovEstoqueProduto>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}