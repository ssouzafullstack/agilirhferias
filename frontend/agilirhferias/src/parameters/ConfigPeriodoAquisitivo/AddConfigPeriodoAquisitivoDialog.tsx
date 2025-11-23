import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
  Input,
  Label,
  SpinButton,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type { ConfigPeriodoAquisitivoForCreateDto } from "../../stores/ConfigPeriodoAquisitivoStore";
import { formatDateBR } from "../../utils/formatDateBR";

const useStyles = makeStyles({
  fieldRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "12px",
  },
  label: {
    minWidth: "100px",
  },
  input: {
    flex: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
  },
});

interface AddConfigPeriodoAquisitivoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ConfigPeriodoAquisitivoForCreateDto) => void;
}

export function AddConfigPeriodoAquisitivoDialog({
  open,
  onOpenChange,
  onSave,
}: AddConfigPeriodoAquisitivoDialogProps) {
  const styles = useStyles();

  const [formData, setFormData] =
    React.useState<ConfigPeriodoAquisitivoForCreateDto>({
      codigo: null,
      descricao: "",
      numeroMesesTrabalhados: null,
      numeroDiasGozo: null,
      inicioVigencia: undefined,
    });

  const handleChange = <K extends keyof ConfigPeriodoAquisitivoForCreateDto>(
    key: K,
    value: ConfigPeriodoAquisitivoForCreateDto[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData({
      codigo: null,
      descricao: "",
      numeroMesesTrabalhados: null,
      numeroDiasGozo: null,
      inicioVigencia: undefined,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => onOpenChange(data.open)}
      modalType="modal"
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Adicionar - Configuração período aquisitivo</DialogTitle>

          <DialogContent>
            <form className={styles.form}>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Código:</Label>
                <SpinButton
                  className={styles.input}
                  value={formData.codigo}
                  onChange={(_, d) =>
                    handleChange("codigo", Number(d.value) || null)
                  }
                />
                <Label className={styles.label}>Descrição:</Label>
                <Input
                  className={styles.input}
                  value={formData.descricao}
                  onChange={(_, d) => handleChange("descricao", d.value)}
                  placeholder="Ex: Férias"
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Qtd meses trabalhados:</Label>
                <SpinButton
                  className={styles.input}
                  value={formData.numeroMesesTrabalhados}
                  onChange={(_, d) =>
                    handleChange(
                      "numeroMesesTrabalhados",
                      Number(d.value) || null
                    )
                  }
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Qtd dias de gozo:</Label>
                <SpinButton
                  className={styles.input}
                  value={formData.numeroDiasGozo}
                  onChange={(_, d) =>
                    handleChange("numeroDiasGozo", Number(d.value) || null)
                  }
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Início vigência:</Label>
                <DatePicker
                  formatDate={formatDateBR}
                  value={formData.inicioVigencia ?? undefined}
                  onSelectDate={(date) => handleChange("inicioVigencia", date)}
                  placeholder="Selecione uma data"
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
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
                icon={<Dismiss20Regular onClick={handleCancel} />}
              >
                Cancelar
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
