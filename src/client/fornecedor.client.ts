import axios, { AxiosInstance } from "axios";

import { Fornecedor } from "@/model/fornecedor";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";


export class FornecedorClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/fornecedores',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<Fornecedor> {
        try {
            return (await this.axiosClient.get<Fornecedor>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(fornecedor: Fornecedor): Promise<void> {
		try {
			return (await this.axiosClient.post('/', fornecedor))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(fornecedor: Fornecedor): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${fornecedor.id}`, Fornecedor)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(fornecedor: Fornecedor): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${fornecedor.id}`, fornecedor)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Fornecedor>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Fornecedor>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}