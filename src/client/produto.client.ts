import axios, { AxiosInstance } from "axios";

import { Produto } from "@/model/produto";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export class ProdutoClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:8080/api/produtos",
      headers: { "Content-type": "application/json" },
    });
  }

  public async findById(id: number): Promise<Produto> {
    try {
      return (await this.axiosClient.get<Produto>(`/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async cadastrar(produto: Produto): Promise<void> {
    try {
      return await this.axiosClient.post("/", produto);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async editar(produto: Produto): Promise<void> {
    debugger;
    try {
      debugger;
      return (await this.axiosClient.put(`/${produto.id}`, produto)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async desativar(produto: Produto): Promise<void> {
    try {
      return (await this.axiosClient.put(`/desativar/${produto.id}`, produto))
        .data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async findByFiltrosPaginado(
    pageRequest: PageRequest
  ): Promise<PageResponse<Produto>> {
    try {
      let requestPath = "";

      requestPath += `?page=${pageRequest.currentPage}`;
      requestPath += `&size=${pageRequest.pageSize}`;
      requestPath += `&sort=${
        pageRequest.sortField === undefined ? "" : pageRequest.sortField
      },${pageRequest.direction}`;

      return (
        await this.axiosClient.get<PageResponse<Produto>>(requestPath, {
          params: { filtros: pageRequest.filter },
        })
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}
