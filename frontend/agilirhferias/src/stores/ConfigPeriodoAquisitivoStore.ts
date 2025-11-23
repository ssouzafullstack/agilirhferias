import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import type { RootStore } from "./RootStore";
import api from "../services/api";

export interface ConfigPeriodoAquisitivoDto {
  id: string;
  codigo: number;
  descricao: string;
  numeroMesesTrabalhados: number;
  numeroDiasGozo: number;
  inicioVigencia: string;
}

export interface ConfigPeriodoAquisitivoForCreateDto {
  codigo: number | null;
  descricao: string;
  numeroMesesTrabalhados: number | null;
  numeroDiasGozo: number | null;
  inicioVigencia: Date | null | undefined;
}

export interface ConfigPeriodoAquisitivoForUpdateDto {
  id: string;
  codigo: number | null;
  descricao: string;
  numeroMesesTrabalhados: number | null;
  numeroDiasGozo: number | null;
  inicioVigencia: Date | null | undefined;
}

export class ConfigPeriodoAquisitivoStore {
  root?: RootStore;
  base = createBaseState();
  configsPeriodoAquisitivo: ConfigPeriodoAquisitivoDto[] = [];
  configPeriodoAquisitivoForUpdate: ConfigPeriodoAquisitivoForUpdateDto | null =
    null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get("/configPeriodoAquisitivo");
      runInAction(() => {
        this.configsPeriodoAquisitivo = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get(`/configPeriodoAquisitivo/${id}`);
      runInAction(() => {
        this.configPeriodoAquisitivoForUpdate = data;
      });
    });
  }

  async create(configPeriodoAquisitivo: ConfigPeriodoAquisitivoForCreateDto) {
    await this.base.execute(async () => {
      await api.post("/configPeriodoAquisitivo", configPeriodoAquisitivo);
      await this.getAll();
    });
  }

  async update(configPeriodoAquisitivo: ConfigPeriodoAquisitivoForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/configPeriodoAquisitivo/${configPeriodoAquisitivo.id}`, configPeriodoAquisitivo);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/configPeriodoAquisitivo/${id}`);
      await this.getAll();
    });
  }
}
