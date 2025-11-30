import { makeAutoObservable, runInAction } from "mobx";
import { createBaseState } from "./createBaseState";
import type { RootStore } from "./RootStore";
import api from "../services/api";
import type { ComboboxDto } from "../services/ComboboxDto";

export type SituacaoTurno = "" | "Ativa" | "Inativa";

export interface TurnoTrabalhoDto {
  id: string;
  codigo: string;
  descricao: string;
  entrada1: string;
  saida1: string;
  entrada2: string;
  saida2: string;
  inicioVigencia: string;
  situacao: number;
}

export interface TurnoTrabalhoForCreateDto {
  codigo: string;
  descricao: string;
  entrada1: string;
  saida1: string;
  entrada2: string;
  saida2: string;
  inicioVigencia: Date | string | null | undefined;
  situacao: SituacaoTurno;
}

export interface TurnoTrabalhoForUpdateDto {
  id: string;
  codigo: string;
  descricao: string;
  entrada1: string;
  saida1: string;
  entrada2: string;
  saida2: string;
  inicioVigencia: Date | string | null | undefined;
  situacao: SituacaoTurno;
}

export class TurnoTrabalhoStore {
  root?: RootStore;
  base = createBaseState();
  turnos: TurnoTrabalhoDto[] = [];
  turnoForUpdate: TurnoTrabalhoForUpdateDto | null = null;
  combobox: ComboboxDto[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    await this.base.execute(async () => {
      const { data } = await api.get("/turnoTrabalho");
      runInAction(() => {
        this.turnos = data;
      });
    });
  }

  async getCombobox() {
    await this.base.execute(async () => {
      const { data } = await api.get<ComboboxDto[]>("/turnoTrabalho/combobox");
      runInAction(() => {
        this.combobox = data;
      });
    });
  }

  async get(id: string) {
    await this.base.execute(async () => {
      const { data } = await api.get(`/turnoTrabalho/${id}`);
      runInAction(() => {
        this.turnoForUpdate = data;
      });
    });
  }

  async create(turno: TurnoTrabalhoForCreateDto) {
    await this.base.execute(async () => {
      await api.post("/turnoTrabalho", turno);
      await this.getAll();
    });
  }

  async update(turno: TurnoTrabalhoForUpdateDto) {
    await this.base.execute(async () => {
      await api.put(`/turnoTrabalho/${turno.id}`, turno);
      await this.getAll();
    });
  }

  async delete(id: string) {
    await this.base.execute(async () => {
      await api.delete(`/turnoTrabalho/${id}`);
      await this.getAll();
    });
  }
}
