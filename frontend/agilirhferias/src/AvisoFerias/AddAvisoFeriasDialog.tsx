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
  AvisoFeriasForCreateDto,
  SituacaoAvisoFerias,
} from "../stores/AvisoFeriasStore";
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

interface AddAvisoFeriasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: AvisoFeriasForCreateDto) => void;
}

const initialForm: AvisoFeriasForCreateDto = {
  colaborador: "",
  dataAdmissao: null,
  periodoAquisitivo: "",
  diasGozo: null,
  diasAbono: null,
  faltas: null,
  diasDisponiveis: null,
  dataInicio: null,
  dataFim: null,
  situacao: "",
  salario: null,
  adicionalFerias: null,
  totalPagamentoFerias: null,
  observacao: "",
};

export function AddAvisoFeriasDialog({
  open,
  onOpenChange,
  onSave,
}: AddAvisoFeriasDialogProps) {
  const styles = useStyles();
  const [form, setForm] =
    React.useState<AvisoFeriasForCreateDto>(initialForm);

  const handleChange = <K extends keyof AvisoFeriasForCreateDto>(
    key: K,
    value: AvisoFeriasForCreateDto[K]
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
          <DialogTitle>Adicionar aviso de férias</DialogTitle>

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

              {/* Dias Gozo / Abono */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Dias de gozo:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.diasGozo ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "diasGozo",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />

                <Label className={styles.label}>Dias de abono:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.diasAbono ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "diasAbono",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />
              </div>

              {/* Faltas / Dias disponíveis */}
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

              {/* Datas início / fim */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Data início:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={
                    form.dataInicio
                      ? new Date(form.dataInicio as any)
                      : undefined
                  }
                  onSelectDate={(date) =>
                    handleChange("dataInicio", date ?? null)
                  }
                  placeholder="Selecione a data"
                />

                <Label className={styles.label}>Data fim:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={
                    form.dataFim
                      ? new Date(form.dataFim as any)
                      : undefined
                  }
                  onSelectDate={(date) =>
                    handleChange("dataFim", date ?? null)
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
                    handleChange(
                      "situacao",
                      data.value as SituacaoAvisoFerias
                    )
                  }
                >
                  <Option value="">Selecione</Option>
                  <Option value="Programada">Programada</Option>
                  <Option value="Homologada">Homologada</Option>
                  <Option value="Cancelada">Cancelada</Option>
                </Select>
              </div>

              {/* Salário / Adicional / Total */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Salário:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.salario ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "salario",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Adicional férias:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.adicionalFerias ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "adicionalFerias",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />

                <Label className={styles.label}>Total férias:</Label>
                <SpinButton
                  className={styles.input}
                  value={form.totalPagamentoFerias ?? 0}
                  onChange={(_, d) =>
                    handleChange(
                      "totalPagamentoFerias",
                      d.value ? Number(d.value) || null : null
                    )
                  }
                />
              </div>

              {/* Observação */}
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Observação:</Label>
                <Textarea
                  className={styles.input}
                  value={form.observacao}
                  onChange={(_, d) =>
                    handleChange("observacao", d.value ?? "")
                  }
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
