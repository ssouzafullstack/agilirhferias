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
  Select,
  Option,
  Textarea,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type {
  EscalaFeriasForCreateDto,
  SituacaoEscalaFerias,
} from "../stores/EscalaFeriasStore";
import { formatDateBR } from "../utils/formatDateBR";

const useStyles = makeStyles({
  fieldRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap",
    alignItems: "center",
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
  colaborador: "",
  dataAdmissao: null,
  periodoAquisitivo: "",
  numeroDiasGozo: null,
  numeroDiasAbono: null,
  faltas: null,
  diasDisponiveis: null,
  inicioFerias: null,
  fimFerias: null,
  situacao: "",
  observacao: "",
};

export function AddEscalaFeriasDialog({
  open,
  onOpenChange,
  onSave,
}: AddEscalaFeriasDialogProps) {
  const styles = useStyles();
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
              {/* Colaborador / Data admissão */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Colaborador:</Label>
                <Input
                  className={styles.input}
                  value={form.colaborador}
                  onChange={(_, d) =>
                    handleChange("colaborador", d.value ?? "")
                  }
                />
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

              {/* Período aquisitivo */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Período aquisitivo:</Label>
                <Input
                  className={styles.input}
                  value={form.periodoAquisitivo}
                  onChange={(_, d) =>
                    handleChange("periodoAquisitivo", d.value ?? "")
                  }
                  placeholder="Ex: 01/2024 - 12/2024"
                />
              </div>

              {/* Dias Gozo / Abono / Faltas / Dias disponíveis */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Dias de gozo:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.numeroDiasGozo ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "numeroDiasGozo",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />

                <Label className={styles.label}>Dias de abono:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.numeroDiasAbono ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "numeroDiasAbono",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Faltas:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.faltas ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "faltas",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />

                <Label className={styles.label}>Dias disponíveis:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.diasDisponiveis ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "diasDisponiveis",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />
              </div>

              {/* Datas início/fim */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Data início:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={
                    form.inicioFerias
                      ? new Date(form.inicioFerias as any)
                      : undefined
                  }
                  onSelectDate={(date) =>
                    handleChange("inicioFerias", date ?? null)
                  }
                  placeholder="Selecione a data"
                />

                <Label className={styles.label}>Data fim:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={
                    form.fimFerias ? new Date(form.fimFerias as any) : undefined
                  }
                  onSelectDate={(date) =>
                    handleChange("fimFerias", date ?? null)
                  }
                  placeholder="Selecione a data"
                />
              </div>

              {/* Situação */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Situação:</Label>
                <Select
                  className={styles.input}
                  value={form.situacao}
                  onChange={(_, data) =>
                    handleChange("situacao", data.value as SituacaoEscalaFerias)
                  }
                >
                  <Option value="">Selecione</Option>
                  <Option value="Programada">Programada</Option>
                  <Option value="Homologada">Homologada</Option>
                  <Option value="Cancelada">Cancelada</Option>
                </Select>
              </div>

              {/* Observação */}
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
