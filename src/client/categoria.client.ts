import axios, { AxiosInstance } from "axios";

import { Categoria } from "@/model/categoria";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export class CategoriaClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/categorias',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async cadastrar(categoria: Categoria): Promise<void> {
		try {
			return (await this.axiosClient.post('/', categoria))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(categoria: Categoria): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${categoria.id}`, categoria)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(categoria: Categoria): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${categoria.id}`, categoria)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Categoria>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Categoria>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}
}