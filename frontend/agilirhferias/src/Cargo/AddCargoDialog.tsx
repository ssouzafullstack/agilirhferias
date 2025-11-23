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
import type { CargoForCreateDto, SituacaoCargo } from "../stores/CargoStore";
import { formatDateBR } from "../utils/formatDateBR";

const useStyles = makeStyles({
  fieldRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  label: {
    minWidth: "120px",
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

interface AddCargoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CargoForCreateDto) => void;
}

const initialFormData: CargoForCreateDto = {
  codigo: null,
  nome: "",
  nivel: "",
  cbo: "",
  gerenciaSupervisao: false,
  inicioVigencia: undefined,
  situacao: "",
};

export function AddCargoDialog({
  open,
  onOpenChange,
  onSave,
}: AddCargoDialogProps) {
  const styles = useStyles();

  const [formData, setFormData] =
    React.useState<CargoForCreateDto>(initialFormData);

  const handleChange = <K extends keyof CargoForCreateDto>(
    key: K,
    value: CargoForCreateDto[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
    setFormData(initialFormData);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData(initialFormData);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => onOpenChange(data.open)}
      modalType="modal"
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Adicionar cargo</DialogTitle>

          <DialogContent>
            <form className={styles.form}>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Código:</Label>
                <SpinButton
                  className={styles.input}
                  value={formData.codigo ?? 0}
                  onChange={(_, d) =>
                    handleChange("codigo", Number(d.value) || null)
                  }
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Nome:</Label>
                <Input
                  className={styles.input}
                  value={formData.nome}
                  onChange={(_, d) => handleChange("nome", d.value ?? "")}
                  placeholder="Ex: Analista de RH"
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Nível:</Label>
                <Input
                  className={styles.input}
                  value={formData.nivel}
                  onChange={(_, d) => handleChange("nivel", d.value ?? "")}
                  placeholder="Ex: Júnior / Pleno / Sênior"
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>CBO:</Label>
                <Input
                  className={styles.input}
                  value={formData.cbo}
                  onChange={(_, d) => handleChange("cbo", d.value ?? "")}
                  placeholder="Ex: 2524-05"
                />
              </div>

              <div className={styles.fieldRow}>
                <Checkbox
                  label="Gerência / Supervisão"
                  checked={formData.gerenciaSupervisao}
                  onChange={(_, data) =>
                    handleChange("gerenciaSupervisao", Boolean(data.checked))
                  }
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Início de vigência:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={formData.inicioVigencia ?? undefined}
                  onSelectDate={(date) =>
                    handleChange("inicioVigencia", date ?? undefined)
                  }
                  placeholder="Selecione uma data"
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Situação:</Label>
                <Select
                  className={styles.input}
                  value={formData.situacao}
                  onChange={(_, data) =>
                    handleChange("situacao", data.value as SituacaoCargo)
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
