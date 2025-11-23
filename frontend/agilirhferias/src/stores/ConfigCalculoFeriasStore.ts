import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";
import type { RootStore } from "./RootStore";
import { createBaseState } from "./createBaseState";

export interface ConfigCalculoFeriasForUpdateDto {
  id: string;
  multiplicarSempreNumeroDiasMes: boolean;
  multiplicarSempreTrintaDias: boolean;
  dividirSempreNumeroDiasMes: boolean;
  dividirSempreTrintaDias: boolean;
  dividirFevereiroTrintaDias: boolean;
  ultimaAlteracao: Date | null;
}

export class ConfigCalculoFeriasStore {
  root?: RootStore;
  base = createBaseState();
  configCalculoFerias: ConfigCalculoFeriasForUpdateDto | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async get() {
    await this.base.execute(async () => {
      const { data } = await api.get(`/configCalculoFerias`);
      runInAction(() => {
        this.configCalculoFerias = data;
      });
    });
  }

  async update(configCalculoFerias: ConfigCalculoFeriasForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(
        `/configCalculoFerias/${configCalculoFerias.id}`,
        configCalculoFerias
      );
      await this.get()
    });
  }
}

export const configCalculoFeriasStore = new ConfigCalculoFeriasStore();
