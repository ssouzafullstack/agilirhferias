import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Label,
  SpinButton,
  Select,
  Textarea,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type { EscalaFeriasForCreateDto } from "../stores/EscalaFeriasStore";
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
    minWidth: "160px",
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

interface AddEscalaFeriasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EscalaFeriasForCreateDto) => void;
}

const initialForm: EscalaFeriasForCreateDto = {
  nomeColaborador: "",
  dataAdmissao: null,
  inicioPeriodoAquisitivo: null,
  fimPeriodoAquisitivo: null,
  numeroDiasGozo: null,
  numeroDiasAbono: null,
  faltas: null,
  numeroDiasDisponiveis: null,
  inicioFerias: null,
  fimFerias: null,
  situacao: 1,
  observacao: "",
  idColaborador: "",
};

export function AddEscalaFeriasDialog({
  open,
  onOpenChange,
  onSave,
}: AddEscalaFeriasDialogProps) {
  const styles = useStyles();
  const { colaboradorStore } = useStore();
  const [form, setForm] = React.useState<EscalaFeriasForCreateDto>(initialForm);

  const handleChange = <K extends keyof EscalaFeriasForCreateDto>(
    key: K,
    value: EscalaFeriasForCreateDto[K]
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
      onOpenChange={(_, d) => onOpenChange(d.open)}
      modalType="modal"
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Adicionar escala de férias</DialogTitle>

          <DialogContent>
            <form className={styles.form}>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Colaborador:</Label>
                <Select
                  className={styles.input}
                  value={form?.idColaborador}
                  onChange={(_, data) =>
                    handleChange("idColaborador", data.value)
                  }
                >
                  <option value="">Selecione...</option>
                  {colaboradorStore.combobox.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.descricao}
                    </option>
                  ))}
                </Select>
              </div>

              <div className={styles.fieldRow}>
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
                  <Label className={styles.label}>Dias de gozo:</Label>
                  <SpinButton
                    className={styles.input}
                    value={form.numeroDiasGozo ?? 0}
                    onChange={(_, d) => {
                      const value = d.displayValue ?? "0";
                      handleChange("numeroDiasGozo", Number(value));
                    }}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Dias de abono:</Label>
                  <SpinButton
                    className={styles.input}
                    value={form.numeroDiasAbono ?? 0}
                    onChange={(_, d) => {
                      const value = d.displayValue ?? "0";
                      handleChange("numeroDiasAbono", Number(value));
                    }}
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
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

                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Dias disponíveis:</Label>
                  <SpinButton
                    className={styles.input}
                    value={form.numeroDiasDisponiveis ?? 0}
                    onChange={(_, d) => {
                      const value = d.displayValue ?? "0";
                      handleChange("numeroDiasDisponiveis", Number(value));
                    }}
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Data início:</Label>
                  <DatePicker
                    formatDate={formatDateBR}
                    value={
                      form.inicioFerias
                        ? new Date(form.inicioFerias)
                        : undefined
                    }
                    onSelectDate={(date) =>
                      handleChange("inicioFerias", date ?? null)
                    }
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Data fim:</Label>
                  <DatePicker
                    formatDate={formatDateBR}
                    value={
                      form.fimFerias ? new Date(form.fimFerias) : undefined
                    }
                    onSelectDate={(date) =>
                      handleChange("fimFerias", date ?? null)
                    }
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
                  <option value="1">Programada</option>
                  <option value="2">Homologada</option>
                  <option value="3">Cancelada</option>
                </Select>
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Observação:</Label>
                <Textarea
                  className={styles.input}
                  value={form.observacao}
                  onChange={(_, d) => handleChange("observacao", d.value ?? "")}
                  resize="vertical"
                  rows={4}
                />
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
