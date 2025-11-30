import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import type { RootStore } from "./RootStore";
import api from "../services/api";

export type SituacaoCargo = "" | "Ativo" | "Inativo";

export interface CargoDto {
  id: string;
  codigo: number;
  descricao: string;
  nivelCargo: string;
  cbo: string;
  gerenciaSupervisao: boolean;
  inicioVigencia: string;
  situacao: "Ativo" | "Inativo";
}

export interface CargoForCreateDto {
  codigo: number | null;
  descricao: string;
  nivelCargo: string;
  cbo: string;
  gerenciaSupervisao: boolean;
  inicioVigencia: Date | null | undefined;
  situacao: SituacaoCargo;
}

export interface CargoForUpdateDto {
  id: string;
  codigo: number | null;
  descricao: string;
  nivelCargo: string;
  cbo: string;
  gerenciaSupervisao: boolean;
  inicioVigencia: Date | null | undefined;
  situacao: SituacaoCargo;
}

export class CargoStore {
  root?: RootStore;
  base = createBaseState();
  cargos: CargoDto[] = [];
  cargoForUpdate: CargoForUpdateDto | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get("/cargo");
      runInAction(() => {
        this.cargos = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get(`/cargo/${id}`);
      runInAction(() => {
        this.cargoForUpdate = data;
      });
    });
  }

  async create(cargo: CargoForCreateDto) {
    await this.base.execute(async () => {
      await api.post("/cargo", cargo);
      await this.getAll();
    });
  }

  async update(cargo: CargoForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/cargo/${cargo.id}`, cargo);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/cargo/${id}`);
      await this.getAll();
    });
  }
}
