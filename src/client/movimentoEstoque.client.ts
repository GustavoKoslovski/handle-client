import axios, { AxiosInstance } from "axios";

import { MovimentoEstoque } from "@/model/movimentoEstoque";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export class MovimentoEstoqueClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:8080/api/movimentos_estoque",
      headers: { "Content-type": "application/json" },
    });
  }

  public async findById(id: number): Promise<MovimentoEstoque> {
    try {
      return (await this.axiosClient.get<MovimentoEstoque>(`/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async cadastrar(movimentoEstoque: MovimentoEstoque): Promise<MovimentoEstoque> {
		try {
			return (await this.axiosClient.post('/', movimentoEstoque)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

  public async editar(movimentoEstoque: MovimentoEstoque): Promise<void> {
    try {
      return (
        await this.axiosClient.put(`/${movimentoEstoque.id}`, MovimentoEstoque)
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async desativar(movimentoEstoque: MovimentoEstoque): Promise<void> {
    try {
      return (
        await this.axiosClient.put(
          `/desativar/${movimentoEstoque.id}`,
          movimentoEstoque
        )
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async findByFiltrosPaginado(
    pageRequest: PageRequest
  ): Promise<PageResponse<MovimentoEstoque>> {
    try {
      let requestPath = "";

      requestPath += `?page=${pageRequest.currentPage}`;
      requestPath += `&size=${pageRequest.pageSize}`;
      requestPath += `&sort=${
        pageRequest.sortField === undefined ? "" : pageRequest.sortField
      },${pageRequest.direction}`;

      return (
        await this.axiosClient.get<PageResponse<MovimentoEstoque>>(
          requestPath,
          {
            params: { filtros: pageRequest.filter },
          }
        )
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}
