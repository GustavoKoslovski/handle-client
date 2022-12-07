import axios, { AxiosInstance } from "axios";

import { Venda } from "@/model/venda";
import { VendaProduto } from "@/model/vendaProduto";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";


export class VendaProdutoClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/vendas_produtos',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<VendaProduto> {
        try {
            return (await this.axiosClient.get<VendaProduto>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(vendaProduto: VendaProduto): Promise<void> {
		try {
			return (await this.axiosClient.post('/', vendaProduto))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(vendaProduto: VendaProduto): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${vendaProduto.id}`, vendaProduto)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(vendaProduto: VendaProduto): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${vendaProduto.id}`, vendaProduto)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<VendaProduto>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<VendaProduto>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}