import * as React from "react";
import {
  Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions,
  Button, Input, Label, Select, Option, makeStyles
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type { TurnoTrabalhoForCreateDto, SituacaoTurno } from "../stores/TurnoTrabalhoStore";
import { formatDateBR } from "../utils/formatUtils";

const useStyles = makeStyles({
  fieldRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  label: {
    minWidth: "140px",
  },
  input: {
    flex: 1,
    minWidth: "160px",
  },
  form: { display: "flex", flexDirection: "column", marginTop: "12px" },
});

interface AddTurnoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: TurnoTrabalhoForCreateDto) => void;
}

const initialForm: TurnoTrabalhoForCreateDto = {
  codigo: "",
  descricao: "",
  entrada1: "",
  saida1: "",
  entrada2: "",
  saida2: "",
  inicioVigencia: undefined,
  situacao: "",
};

export function AddTurnoTrabalhoDialog({ open, onOpenChange, onSave }: AddTurnoProps) {
  const styles = useStyles();
  const [form, setForm] = React.useState(initialForm);

  const change = <K extends keyof TurnoTrabalhoForCreateDto>(
    key: K, value: TurnoTrabalhoForCreateDto[K]
  ) => setForm(prev => ({ ...prev, [key]: value }));

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
    <Dialog open={open} onOpenChange={(_, d) => onOpenChange(d.open)} modalType="modal">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Adicionar Turno de Trabalho</DialogTitle>

          <DialogContent>
            <form className={styles.form}>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Código:</Label>
                <Input className={styles.input} value={form.codigo}
                  onChange={(_, d) => change("codigo", d.value)} />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Descrição:</Label>
                <Input className={styles.input} value={form.descricao}
                  onChange={(_, d) => change("descricao", d.value)} />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Entrada 1:</Label>
                <Input type="time" className={styles.input}
                  value={form.entrada1}
                  onChange={(_, d) => change("entrada1", d.value)} />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Saída 1:</Label>
                <Input type="time" className={styles.input}
                  value={form.saida1}
                  onChange={(_, d) => change("saida1", d.value)} />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Entrada 2:</Label>
                <Input type="time" className={styles.input}
                  value={form.entrada2}
                  onChange={(_, d) => change("entrada2", d.value)} />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Saída 2:</Label>
                <Input type="time" className={styles.input}
                  value={form.saida2}
                  onChange={(_, d) => change("saida2", d.value)} />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Início Vigência:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={form.inicioVigencia as any}
                  onSelectDate={(date) => change("inicioVigencia", date ?? undefined)}
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Situação:</Label>
                <Select
                  className={styles.input}
                  value={form.situacao}
                  onChange={(_, data) =>
                    change("situacao", data.value as SituacaoTurno)
                  }
                >
                  <Option value="">Selecione</Option>
                  <Option value="Ativa">Ativa</Option>
                  <Option value="Inativa">Inativa</Option>
                </Select>
              </div>
            </form>
          </DialogContent>

          <DialogActions>
            <Button appearance="primary" icon={<Save20Regular />} onClick={handleSubmit}>
              Salvar
            </Button>
            <Button appearance="secondary" icon={<Dismiss20Regular />} onClick={handleCancel}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
