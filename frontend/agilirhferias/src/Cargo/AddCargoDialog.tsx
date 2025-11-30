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
  Select,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type { CargoForCreateDto } from "../stores/CargoStore";
import { formatDateBR } from "../utils/formatUtils";

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
  descricao: "",
  nivelCargo: "",
  cbo: "",
  gerenciaSupervisao: false,
  inicioVigencia: undefined,
  situacao: 1,
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
                <Label className={styles.label}>Nome:</Label>
                <Input
                  className={styles.input}
                  value={formData.descricao}
                  onChange={(_, d) => handleChange("descricao", d.value ?? "")}
                  placeholder="Ex: Analista de RH"
                />
              </div>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Nível:</Label>
                <Select
                  className={styles.input}
                  value={formData.nivelCargo}
                  onChange={(_, data) => handleChange("nivelCargo", data.value)}
                >
                  <option value="1">Junior I</option>
                  <option value="2">Junior II</option>
                  <option value="3">Pleno I</option>
                  <option value="4">Pleno II</option>
                  <option value="5">Senior I</option>
                  <option value="6">Senior II</option>
                  <option value="7">Master I</option>
                  <option value="8">Master II</option>
                </Select>
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
                  value={String(formData.situacao)}
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
