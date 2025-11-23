import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import type { RootStore } from "./RootStore";

export type SituacaoColaborador = "" | "Ativo" | "Inativo";

export interface ColaboradorDto {
  id: string;
  matricula: string;
  nome: string;
  dataAdmissao: string;
  dataDesligamento: string | null;
  inicioPeriodoAquisitivo: string;
  fimPeriodoAquisitivo: string;
  situacao: "Ativo" | "Inativo";
}

export interface ColaboradorForCreateDto {
  matricula: string;
  nome: string;
  email: string;
  dataAdmissao: Date | string | null;
  dataDesligamento: Date | string | null;
  salario: number | null;
  cargo: string;
  turno: string;
  configPeriodoAquisitivo: string;
  faltas: number | null;
  inicioPeriodoAquisitivo: Date | string | null;
  fimPeriodoAquisitivo: Date | string | null;
  exerceLideranca: boolean;
  lider: string;
  situacao: SituacaoColaborador;
}

export interface ColaboradorForUpdateDto extends ColaboradorForCreateDto {
  id: string;
}

export class ColaboradorStore {
  root?: RootStore;

  base = createBaseState();
  colaboradores: ColaboradorDto[] = [];
  colaboradorForUpdate: ColaboradorForUpdateDto | null = null;

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