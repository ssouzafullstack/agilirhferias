import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";
import type { RootStore } from "./RootStore";
import { createBaseState } from "./createBaseState";

export interface FaixaOrcamentoFeriasDto {
  id: string;
  mes: number;
  orcamento: number;
}

export interface ConfigOrcamentoFeriasForUpdateDto {
  id: string;
  faixasOrcamentoFerias: FaixaOrcamentoFeriasDto[];
  ultimaAlteracao: Date | null;
}

export class ConfigOrcamentoFeriasStore {
  root?: RootStore;
  base = createBaseState();
  config: ConfigOrcamentoFeriasForUpdateDto | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async get() {
    await this.base.execute(async () => {
      const { data } = await api.get(`/configOrcamentoFerias`);
      runInAction(() => {
        this.config = data;
      });
    });
  }

  async update(config: ConfigOrcamentoFeriasForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/configOrcamentoFerias/${config.id}`, config);
      await this.get();
    });
  }
}

export const configOrcamentoFeriasStore = new ConfigOrcamentoFeriasStore();
