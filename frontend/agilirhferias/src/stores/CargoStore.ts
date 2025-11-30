import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import type { RootStore } from "./RootStore";
import api from "../services/api";
import type { ComboboxDto } from "../services/ComboboxDto";

export interface CargoDto {
  id: string;
  codigo: number;
  descricao: string;
  nivelCargo: number;
  cbo: string;
  gerenciaSupervisao: boolean;
  inicioVigencia: string;
  situacao: number;
}

export interface CargoForCreateDto {
  codigo: number | null;
  descricao: string;
  nivelCargo: string;
  cbo: string;
  gerenciaSupervisao: boolean;
  inicioVigencia: Date | null | undefined;
  situacao: number;
}

export interface CargoForUpdateDto {
  id: string;
  codigo: number | null;
  descricao: string;
  nivelCargo: string;
  cbo: string;
  gerenciaSupervisao: boolean;
  inicioVigencia: Date | null | undefined;
  situacao: number;
}

export class CargoStore {
  root?: RootStore;
  base = createBaseState();
  cargos: CargoDto[] = [];
  cargoForUpdate: CargoForUpdateDto | null = null;
  combobox: ComboboxDto[] = [];

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

  async getCombobox() {
    await this.base.execute(async () => {
      const { data } = await api.get<ComboboxDto[]>("/cargo/combobox");
      runInAction(() => {
        this.combobox = data;
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
