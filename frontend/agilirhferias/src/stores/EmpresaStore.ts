import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "./RootStore";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import { formatBoolean, formatSituacao } from "../utils/formatUtils";
import type { ComboboxDto } from "../services/ComboboxDto";

export interface EmpresaDto {
  id: string;
  nomeFantasia: string;
  filial: boolean;
  filialDesc: "SIM" | "NÃO";
  cnpj: string;
  cep: string;
  situacao: number;
  situacaoDesc: "" | "Ativa" | "Baixada";
}

export interface EmpresaForUpsertDto {
  id?: string;
  razaoSocial: string;
  nomeFantasia: string;
  filial: boolean;
  cnpj: string;
  cep: string;
  situacao: number;
}

export class EmpresaStore {
  root?: RootStore;
  base = createBaseState();
  empresaForUpsert: EmpresaForUpsertDto | null = null;
  empresas: EmpresaDto[] = [];
  combobox: ComboboxDto[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get<EmpresaDto[]>("/empresa");
      const formatted = data.map((item: EmpresaDto) => ({
        ...item,
        filialDesc: formatBoolean(item.filial) as "SIM" | "NÃO",
        situacaoDesc: formatSituacao(item.situacao) as "" | "Ativa" | "Baixada",
      }));
      runInAction(() => {
        this.empresas = formatted;
      });
    });
  }

  async getCombobox() {
    await this.base.execute(async () => {
      const { data } = await api.get<ComboboxDto[]>(
        "/empresa/combobox"
      );
      runInAction(() => {
        this.combobox = data;
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
