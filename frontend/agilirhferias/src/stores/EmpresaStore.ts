import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "./RootStore";
import { createBaseState } from "./createBaseState";
import api from "../services/api";

export interface EmpresaDto {
  id: string;
  codigo: string;
  nomeFantasia: string;
  tipo: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  situacao: string;
}

export interface EmpresaForUpsertDto {
  id?: string;
  codigo: string;
  razaoSocial: string;
  nomeFantasia: string;
  tipo: "" | "Matriz" | "Filial";
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  situacao: "" | "Ativa" | "Baixada";
}

export class EmpresaStore {
  root?: RootStore;
  base = createBaseState();
  empresaForUpsert: EmpresaForUpsertDto | null = null;
  empresas: EmpresaDto[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get<EmpresaDto[]>("/empresa");
      runInAction(() => {
        this.empresas = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get<EmpresaForUpsertDto>(`/empresa/${id}`);
      runInAction(() => {
        this.empresaForUpsert = data;
      });
    });
  }

  async create(empresa: EmpresaForUpsertDto) {
    await this.base.execute(async () => {
      await api.post("/empresa", empresa);
      await this.getAll();
    });
  }

  async update(empresa: EmpresaForUpsertDto) {
    await this.base.execute(async () => {
      await api.put(`/empresa/${empresa.id}`, empresa);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/empresa/${id}`);
      await this.getAll();
    });
  }
}

export const empresaStore = new EmpresaStore();
