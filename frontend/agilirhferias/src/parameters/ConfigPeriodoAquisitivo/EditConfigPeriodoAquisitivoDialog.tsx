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
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/StoreContext";
import type { ConfigPeriodoAquisitivoForUpdateDto } from "../../stores/ConfigPeriodoAquisitivoStore";
import { formatDateBR } from "../../utils/formatUtils";

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

interface EditConfigPeriodoAquisitivoDialogProps {
  open: boolean;
  selectedItem: string;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ConfigPeriodoAquisitivoForUpdateDto) => void;
}

const EditConfigPeriodoAquisitivoDialog = observer(
  ({
    open,
    selectedItem,
    onOpenChange,
    onSave,
  }: EditConfigPeriodoAquisitivoDialogProps) => {
    const styles = useStyles();
    const { configPeriodoAquisitivoStore } = useStore();

    useEffect(() => {
      if (open && selectedItem) {
        if (
          configPeriodoAquisitivoStore.configPeriodoAquisitivoForUpdate?.id !==
          selectedItem
        ) {
          configPeriodoAquisitivoStore.get(selectedItem);
        }
      }
    }, [open, selectedItem]);

    const handleChange = <K extends keyof ConfigPeriodoAquisitivoForUpdateDto>(
      key: K,
      value: ConfigPeriodoAquisitivoForUpdateDto[K]
    ) => {
      const dto = configPeriodoAquisitivoStore.configPeriodoAquisitivoForUpdate;
      if (dto) {
        dto[key] = value;
      }
    };

    const handleSubmit = () => {
      const dto = configPeriodoAquisitivoStore.configPeriodoAquisitivoForUpdate;
      if (dto) {
        onSave(dto);
        onOpenChange(false);
      }
    };

    const handleCancel = () => {
      onOpenChange(false);
    };

    const dto = configPeriodoAquisitivoStore.configPeriodoAquisitivoForUpdate;

    return (
      <Dialog
        open={open}
        onOpenChange={(_, data) => onOpenChange(data.open)}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Editar - Configuração período aquisitivo</DialogTitle>

            <DialogContent>
              {dto ? (
                <form className={styles.form}>
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Código:</Label>
                    <SpinButton
                      className={styles.input}
                      value={dto.codigo ?? 0}
                      onChange={(_, d) =>
                        handleChange("codigo", Number(d.value) || null)
                      }
                    />

                    <Label className={styles.label}>Descrição:</Label>
                    <Input
                      className={styles.input}
                      value={dto.descricao ?? ""}
                      onChange={(_, d) => handleChange("descricao", d.value)}
                      placeholder="Ex: Férias"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>
                      Qtd meses trabalhados:
                    </Label>
                    <SpinButton
                      className={styles.input}
                      value={dto.numeroMesesTrabalhados ?? 0}
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
                      value={dto.numeroDiasGozo ?? 0}
                      onChange={(_, d) =>
                        handleChange("numeroDiasGozo", Number(d.value) || null)
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Início vigência:</Label>
                    <DatePicker
                      formatDate={formatDateBR}
                      value={
                        dto.inicioVigencia
                          ? new Date(dto.inicioVigencia)
                          : undefined
                      }
                      onSelectDate={(date) =>
                        handleChange("inicioVigencia", date)
                      }
                      placeholder="Selecione uma data"
                    />
                  </div>
                </form>
              ) : (
                <p>Carregando dados...</p>
              )}
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
);

export default EditConfigPeriodoAquisitivoDialog;
