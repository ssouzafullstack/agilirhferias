import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import type { RootStore } from "./RootStore";

export type SituacaoEscalaFerias = "" | "Programada" | "Homologada" | "Cancelada";

export interface EscalaFeriasDto {
  id: string;
  colaborador: string;
  dataAdmissao: string;
  periodoAquisitivo: string;
  diasGozo: number;
  diasAbono: number;
  dataInicio: string;
  dataFim: string;
  situacao: "Programada" | "Homologada" | "Cancelada";
}

export interface EscalaFeriasForCreateDto {
  colaborador: string;
  dataAdmissao: Date | string | null;
  periodoAquisitivo: string;
  diasGozo: number | null;
  diasAbono: number | null;
  faltas: number | null;
  diasDisponiveis: number | null;
  dataInicio: Date | string | null;
  dataFim: Date | string | null;
  situacao: SituacaoEscalaFerias;
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
