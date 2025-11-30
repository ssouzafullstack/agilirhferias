import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import type { RootStore } from "./RootStore";
import type { ComboboxDto } from "../services/ComboboxDto";

export interface ColaboradorDto {
  id: string;
  nome: string;
  salario: number | undefined;
  dataAdmissao: Date | string | undefined;
  dataDesligamento: Date | string | undefined;
  inicioPeriodoAquisitivo: Date | string | undefined;
  fimPeriodoAquisitivo: Date | string | undefined;
  situacao: number;
}

export interface ColaboradorForCreateDto {
  matricula: string;
  nome: string;
  email: string;
  idEmpresa: string;
  empresaDesc: string;
  dataAdmissao: Date | string | null;
  dataDesligamento: Date | string | null;
  salario: number | undefined;
  cargoDesc: string;
  turno: string;
  configPeriodoAquisitivoDesc: string;
  faltas: number | null;
  inicioPeriodoAquisitivo: Date | string | null;
  fimPeriodoAquisitivo: Date | string | null;
  exerceLideranca: boolean;
  numeroDependentes: number;
  situacao: number;
  idCargo: string;
  idConfigPeriodoAquisitivo: string;
}

export interface ColaboradorForUpdateDto extends ColaboradorForCreateDto {
  id: string;
}

export class ColaboradorStore {
  root?: RootStore;

  base = createBaseState();
  colaboradores: ColaboradorDto[] = [];
  colaboradorForUpdate: ColaboradorForUpdateDto | null = null;
  combobox: ComboboxDto[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get("/colaborador");
      runInAction(() => {
        this.colaboradores = data;
      });
    });
  }
  
  async getCombobox() {
    await this.base.execute(async () => {
      const { data } = await api.get<ComboboxDto[]>("/colaborador/combobox");
      runInAction(() => {
        this.combobox = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get(`/colaborador/${id}`);
      runInAction(() => {
        this.colaboradorForUpdate = data;
      });
    });
  }

  async create(dto: ColaboradorForCreateDto) {
    await this.base.execute(async () => {
      await api.post("/colaborador", dto);
      await this.getAll();
    });
  }

  async update(dto: ColaboradorForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/colaborador/${dto.id}`, dto);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/colaborador/${id}`);
      await this.getAll();
    });
  }
}
