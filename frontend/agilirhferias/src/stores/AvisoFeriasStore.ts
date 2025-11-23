import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import type { RootStore } from "./RootStore";

export type SituacaoAvisoFerias = "" | "Programada" | "Homologada" | "Cancelada";

export interface AvisoFeriasDto {
  id: string;
  colaborador: string;
  dataAdmissao: string;
  periodoAquisitivo: string;
  diasGozo: number;
  diasAbono: number;
  dataInicio: string;
  dataFim: string;
  adicionalFerias: number;
  totalFerias: number;
  situacao: "Programada" | "Homologada" | "Cancelada";
}

export interface AvisoFeriasForCreateDto {
  colaborador: string;
  dataAdmissao: Date | string | null;
  periodoAquisitivo: string;
  diasGozo: number | null;
  diasAbono: number | null;
  faltas: number | null;
  diasDisponiveis: number | null;
  dataInicio: Date | string | null;
  dataFim: Date | string | null;
  situacao: SituacaoAvisoFerias;
  salario: number | null;
  adicionalFerias: number | null;
  totalFerias: number | null;
  observacao: string;
}

export interface AvisoFeriasForUpdateDto extends AvisoFeriasForCreateDto {
  id: string;
}

export class AvisoFeriasStore {
  root?: RootStore;

  base = createBaseState();
  avisos: AvisoFeriasDto[] = [];
  avisoForUpdate: AvisoFeriasForUpdateDto | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get("/avisoFerias");
      runInAction(() => {
        this.avisos = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get(`/avisoFerias/${id}`);
      runInAction(() => {
        this.avisoForUpdate = data;
      });
    });
  }

  async create(dto: AvisoFeriasForCreateDto) {
    await this.base.execute(async () => {
      await api.post("/avisoFerias", dto);
      await this.getAll();
    });
  }

  async update(dto: AvisoFeriasForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/avisoFerias/${dto.id}`, dto);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/avisoFerias/${id}`);
      await this.getAll();
    });
  }
}
