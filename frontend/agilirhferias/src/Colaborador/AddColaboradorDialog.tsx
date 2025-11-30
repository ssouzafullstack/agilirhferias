import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Label,
  SpinButton,
  Checkbox,
  Select,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type { ColaboradorForCreateDto } from "../stores/ColaboradorStore";
import { formatDateBR } from "../utils/formatUtils";
import { useStore } from "../stores/StoreContext";

const useStyles = makeStyles({
  fieldRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  label: {
    minWidth: "150px",
  },
  input: {
    flex: 1,
    minWidth: "180px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
  },
});

interface AddColaboradorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ColaboradorForCreateDto) => void;
}

const initialForm: ColaboradorForCreateDto = {
  matricula: "",
  nome: "",
  email: "",
  dataAdmissao: null,
  dataDesligamento: null,
  salario: undefined,
  cargoDesc: "",
  turno: "",
  idCargo: "",
  idConfigPeriodoAquisitivo: "",
  configPeriodoAquisitivoDesc: "",
  faltas: null,
  inicioPeriodoAquisitivo: null,
  fimPeriodoAquisitivo: null,
  exerceLideranca: false,
  numeroDependentes: 0,
  situacao: 1,
  idEmpresa: "",
  empresaDesc: "",
};

export function AddColaboradorDialog({
  open,
  onOpenChange,
  onSave,
}: AddColaboradorDialogProps) {
  const styles = useStyles();

  const { cargoStore, configPeriodoAquisitivoStore, empresaStore } = useStore();
  const [form, setForm] = React.useState<ColaboradorForCreateDto>(initialForm);

  const handleChange = <K extends keyof ColaboradorForCreateDto>(
    key: K,
    value: ColaboradorForCreateDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onOpenChange(false);
    setForm(initialForm);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setForm(initialForm);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => onOpenChange(data.open)}
      modalType="modal"
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Adicionar colaborador</DialogTitle>

          <DialogContent>
            <form className={styles.form}>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Nome:</Label>
                <Input
                  className={styles.input}
                  value={form.nome}
                  onChange={(_, d) => handleChange("nome", d.value ?? "")}
                />
              </div>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>E-mail:</Label>
                <Input
                  className={styles.input}
                  value={form.email}
                  onChange={(_, d) => handleChange("email", d.value ?? "")}
                  placeholder="exemplo@email.com"
                />
              </div>{" "}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Empresa:</Label>
                <Select
                  className={styles.input}
                  value={form?.idEmpresa ?? ""}
                  onChange={(_, data) => handleChange("idEmpresa", data.value)}
                >
                  <option value="">Selecione...</option>
                  {empresaStore.combobox.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.descricao}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Data admissão:</Label>
                  <DatePicker
                    formatDate={formatDateBR}
                    value={
                      form.dataAdmissao
                        ? new Date(form.dataAdmissao as any)
                        : undefined
                    }
                    onSelectDate={(date) =>
                      handleChange("dataAdmissao", date ?? null)
                    }
                    placeholder="Selecione a data"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Data desligamento:</Label>
                  <DatePicker
                    formatDate={formatDateBR}
                    value={
                      form.dataDesligamento
                        ? new Date(form.dataDesligamento as any)
                        : undefined
                    }
                    onSelectDate={(date) =>
                      handleChange("dataDesligamento", date ?? null)
                    }
                    placeholder="Selecione a data"
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Salário R$:</Label>
                  <SpinButton
                    className={styles.input}
                    value={form.salario ?? 0}
                    onChange={(_, d) => {
                      const value = d.displayValue ?? "0";
                      handleChange("salario", Number(value));
                    }}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Faltas:</Label>
                  <SpinButton
                    className={styles.input}
                    value={form.faltas ?? 0}
                    onChange={(_, d) => {
                      const value = d.displayValue ?? "0";
                      handleChange("faltas", Number(value));
                    }}
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Cargo:</Label>
                  <Select
                    className={styles.input}
                    value={form?.idCargo ?? ""}
                    onChange={(_, data) => handleChange("idCargo", data.value)}
                  >
                    <option value="">Selecione...</option>
                    {cargoStore.combobox.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.descricao}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Turno:</Label>
                  <Input
                    className={styles.input}
                    value={form.turno ?? ""}
                    onChange={(_, d) => handleChange("turno", d.value ?? "")}
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>
                  Config. Período Aquisitivo:
                </Label>
                <Select
                  className={styles.input}
                  value={form?.idConfigPeriodoAquisitivo ?? ""}
                  onChange={(_, data) =>
                    handleChange("idConfigPeriodoAquisitivo", data.value)
                  }
                >
                  <option value="">Selecione...</option>
                  {configPeriodoAquisitivoStore.combobox.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.descricao}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>
                    Início período aquisitivo:
                  </Label>
                  <DatePicker
                    formatDate={formatDateBR}
                    value={
                      form.inicioPeriodoAquisitivo
                        ? new Date(form.inicioPeriodoAquisitivo as any)
                        : undefined
                    }
                    onSelectDate={(date) =>
                      handleChange("inicioPeriodoAquisitivo", date ?? null)
                    }
                    placeholder="Selecione a data"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>
                    Fim período aquisitivo:
                  </Label>
                  <DatePicker
                    formatDate={formatDateBR}
                    value={
                      form.fimPeriodoAquisitivo
                        ? new Date(form.fimPeriodoAquisitivo as any)
                        : undefined
                    }
                    onSelectDate={(date) =>
                      handleChange("fimPeriodoAquisitivo", date ?? null)
                    }
                    placeholder="Selecione a data"
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <Checkbox
                    label="Exerce liderança"
                    checked={Boolean(form.exerceLideranca)}
                    onChange={(_, data) =>
                      handleChange("exerceLideranca", Boolean(data.checked))
                    }
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Qtd. Dependentes:</Label>
                  <SpinButton
                    className={styles.input}
                    value={form.numeroDependentes ?? 0}
                    onChange={(_, d) => {
                      const value = d.displayValue ?? "0";
                      handleChange("numeroDependentes", Number(value));
                    }}
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Situação:</Label>
                <Select
                  className={styles.input}
                  value={String(form.situacao)}
                  onChange={(_, data) =>
                    handleChange("situacao", Number(data.value))
                  }
                >
                  <option value="1">Ativa</option>
                  <option value="2">Inativa</option>
                </Select>
              </div>
            </form>
          </DialogContent>

          <DialogActions>
            <Button
              appearance="primary"
              icon={<Save20Regular />}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
            <Button
              appearance="secondary"
              icon={<Dismiss20Regular />}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
