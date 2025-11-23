import { AuthStore } from "./AuthStore";
import { CompanyStore } from "./CompanyStore";
import { ConfigCalculoFeriasStore } from "./ConfigCalculoFeriasStore";
import { ConfigOrcamentoFeriasStore } from "./ConfigOrcamentoFeriasStore";
import { ConfigPeriodoAquisitivoStore } from "./ConfigPeriodoAquisitivoStore";
import { ConfigReducaoDiasFeriasStore } from "./ConfigReducaoDiasFeriasStore";
import { EmpresaStore } from "./EmpresaStore";
import { CargoStore } from "./CargoStore";
import { TurnoTrabalhoStore } from "./TurnoTrabalhoStore";
import { ColaboradorStore } from "./ColaboradorStore";
import { EscalaFeriasStore } from "./EscalaFeriasStore";
import { AvisoFeriasStore } from "./AvisoFeriasStore";

export class RootStore {
  authStore: AuthStore;
  companyStore: CompanyStore;
  configPeriodoAquisitivoStore: ConfigPeriodoAquisitivoStore;
  configCalculoFeriasStore: ConfigCalculoFeriasStore;
  configReducaoDiasFeriasStore: ConfigReducaoDiasFeriasStore;
  configOrcamentoFeriasStore: ConfigOrcamentoFeriasStore;
  empresaStore: EmpresaStore;
  cargoStore: CargoStore;
  turnoTrabalhoStore: TurnoTrabalhoStore;
  colaboradorStore: ColaboradorStore;
  escalaFeriasStore: EscalaFeriasStore;
  avisoFeriasStore: AvisoFeriasStore;

  constructor() {
    this.authStore = new AuthStore();
    this.companyStore = new CompanyStore();
    this.configPeriodoAquisitivoStore = new ConfigPeriodoAquisitivoStore();
    this.configCalculoFeriasStore = new ConfigCalculoFeriasStore();
    this.configReducaoDiasFeriasStore = new ConfigReducaoDiasFeriasStore();
    this.configOrcamentoFeriasStore = new ConfigOrcamentoFeriasStore();
    this.empresaStore = new EmpresaStore();
    this.cargoStore = new CargoStore();
    this.turnoTrabalhoStore = new TurnoTrabalhoStore();
    this.colaboradorStore = new ColaboradorStore();
    this.escalaFeriasStore = new EscalaFeriasStore();
    this.avisoFeriasStore = new AvisoFeriasStore();

    this.authStore.root = this;
    this.companyStore.root = this;
    this.configPeriodoAquisitivoStore.root = this;
    this.configCalculoFeriasStore.root = this;
    this.configReducaoDiasFeriasStore.root = this;
    this.configOrcamentoFeriasStore.root = this;
    this.empresaStore.root = this;
    this.cargoStore.root = this;
    this.turnoTrabalhoStore.root = this;
    this.colaboradorStore.root = this;
    this.escalaFeriasStore.root = this;
    this.avisoFeriasStore.root = this;
  }
}

export const rootStore = new RootStore();
