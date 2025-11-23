import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";
import type { RootStore } from "./RootStore";
import { createBaseState } from "./createBaseState";

export interface FaixaReducaoDiasFeriasDto {
  id: string;
  numeroDiasFaltaInicial: number;
  numeroDiasFaltaFinal: number;
  numeroDiasFerias: number;
}

export interface ConfigReducaoDiasFeriasForUpdateDto {
  id: string;
  faixasReducaoDiasFerias: FaixaReducaoDiasFeriasDto[];
  ultimaAlteracao: Date | null;
}

export class ConfigReducaoDiasFeriasStore {
  root?: RootStore;
  base = createBaseState();
  config: ConfigReducaoDiasFeriasForUpdateDto | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async get() {
    await this.base.execute(async () => {
      const { data } = await api.get<ConfigReducaoDiasFeriasForUpdateDto>(
        `/configReducaoDiasFerias`
      );
      runInAction(() => {
        this.config = data;
      });
    });
  }

  async update(config: ConfigReducaoDiasFeriasForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/configReducaoDiasFerias/${config.id}`, config);
      await this.get();
    });
  }
}

export const configReducaoDiasFeriasStore = new ConfigReducaoDiasFeriasStore();
