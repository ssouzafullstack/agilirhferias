import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import type { RootStore } from "./RootStore";

// export type SituacaoEscalaFerias = "" | "Programada" | "Homologada" | "Cancelada";

export interface EscalaFeriasDto {
  id: string;
  idColaborador: string;
  nomeColaborador: string;
  dataAdmissao: string;
  inicioPeriodoAquisitivo: Date | string | undefined;
  fimPeriodoAquisitivo: Date | string | undefined;
  numeroDiasGozo: number;
  numeroDiasAbono: number;
  inicioFerias: string;
  fimFerias: string;
  situacao: number;
}

export interface EscalaFeriasForCreateDto {
  nomeColaborador: string;
  idColaborador: string;
  dataAdmissao: Date | string | null;
  inicioPeriodoAquisitivo: Date | string | null;
  fimPeriodoAquisitivo: Date | string | null;
  numeroDiasGozo: number | null;
  numeroDiasAbono: number | null;
  faltas: number | null;
  numeroDiasDisponiveis: number | null;
  inicioFerias: Date | string | null;
  fimFerias: Date | string | null;
  situacao: number;
  observacao: string;
}

export interface EscalaFeriasForUpdateDto extends EscalaFeriasForCreateDto {
  id: string;
}

export class EscalaFeriasStore {
  root?: RootStore;

  base = createBaseState();
  escalas: EscalaFeriasDto[] = [];
  escalaForUpdate: EscalaFeriasForUpdateDto | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get("/escalaFerias");
      runInAction(() => {
        this.escalas = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get(`/escalaFerias/${id}`);
      runInAction(() => {
        this.escalaForUpdate = data;
      });
    });
  }

  async create(dto: EscalaFeriasForCreateDto) {
    await this.base.execute(async () => {
      await api.post("/escalaFerias", dto);
      await this.getAll();
    });
  }

  async update(dto: EscalaFeriasForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/escalaFerias/${dto.id}`, dto);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/escalaFerias/${id}`);
      await this.getAll();
    });
  }
}
