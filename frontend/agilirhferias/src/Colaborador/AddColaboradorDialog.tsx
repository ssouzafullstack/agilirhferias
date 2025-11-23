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
  Option,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type {
  ColaboradorForCreateDto,
  SituacaoColaborador,
} from "../stores/ColaboradorStore";
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
  salario: null,
  cargo: "",
  turno: "",
  configPeriodoAquisitivo: "",
  faltas: null,
  inicioPeriodoAquisitivo: null,
  fimPeriodoAquisitivo: null,
  exerceLideranca: false,
  lider: "",
  situacao: "",
};

export function AddColaboradorDialog({
  open,
  onOpenChange,
  onSave,
}: AddColaboradorDialogProps) {
  const styles = useStyles();
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
                <Label className={styles.label}>Matrícula:</Label>
                <Input
                  className={styles.input}
                  value={form.matricula}
                  onChange={(_, d) => handleChange("matricula", d.value ?? "")}
                />

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
                  placeholder="exemplo@empresa.com"
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
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Cargo:</Label>
                <Input
                  className={styles.input}
                  value={form.cargo}
                  onChange={(_, d) => handleChange("cargo", d.value ?? "")}
                />

                <Label className={styles.label}>Turno:</Label>
                <Input
                  className={styles.input}
                  value={form.turno}
                  onChange={(_, d) => handleChange("turno", d.value ?? "")}
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>
                  Config. Período Aquisitivo:
                </Label>
                <Input
                  className={styles.input}
                  value={form.configPeriodoAquisitivo}
                  onChange={(_, d) =>
                    handleChange("configPeriodoAquisitivo", d.value ?? "")
                  }
                />
              </div>

              <div className={styles.fieldRow}>
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

                <Label className={styles.label}>Fim período aquisitivo:</Label>
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

              <div className={styles.fieldRow}>
                <Checkbox
                  label="Exerce liderança"
                  checked={Boolean(form.exerceLideranca)}
                  onChange={(_, data) =>
                    handleChange("exerceLideranca", Boolean(data.checked))
                  }
                />

                <Label className={styles.label}>Líder:</Label>
                <Input
                  className={styles.input}
                  value={form.lider}
                  onChange={(_, d) => handleChange("lider", d.value ?? "")}
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Situação:</Label>
                <Select
                  className={styles.input}
                  value={form.situacao}
                  onChange={(_, data) =>
                    handleChange("situacao", data.value as SituacaoColaborador)
                  }
                >
                  <Option value="">Selecione</Option>
                  <Option value="Ativo">Ativo</Option>
                  <Option value="Inativo">Inativo</Option>
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
