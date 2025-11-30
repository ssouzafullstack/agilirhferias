import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import api from "../services/api";
import type { RootStore } from "./RootStore";

export interface AvisoFeriasDto {
  id: string;
  nomeColaborador: string;
  dataAdmissao: string;
  inicioPeriodoAquisitivo: Date | string | undefined;
  fimPeriodoAquisitivo: Date | string | undefined;
  numeroDiasGozo: number;
  numeroDiasAbono: number;
  inicioFerias: Date | string | undefined;
  fimFerias: Date | string | undefined;
  adicionalFerias: number;
  totalPagamentoFerias: number;
  situacao: number;
}

export interface AvisoFeriasForCreateDto {
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
  salario: number | null;
  adicionalFerias: number | null;
  totalPagamentoFerias: number | null;
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
