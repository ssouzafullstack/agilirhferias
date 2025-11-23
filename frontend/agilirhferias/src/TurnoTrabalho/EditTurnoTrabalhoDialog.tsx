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
  Option,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";
import type {
  TurnoTrabalhoForUpdateDto,
  SituacaoTurno,
} from "../stores/TurnoTrabalhoStore";
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
    minWidth: "140px",
  },
  input: {
    flex: 1,
    minWidth: "160px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
  },
});

interface EditTurnoTrabalhoDialogProps {
  open: boolean;
  selectedItem: string;
  onOpenChange: (open: boolean) => void;
  onSave: (data: TurnoTrabalhoForUpdateDto) => void;
}

const EditTurnoTrabalhoDialog = observer(
  ({ open, selectedItem, onOpenChange, onSave }: EditTurnoTrabalhoDialogProps) => {
    const styles = useStyles();
    const { turnoTrabalhoStore } = useStore();

    useEffect(() => {
      if (open && selectedItem) {
        if (turnoTrabalhoStore.turnoForUpdate?.id !== selectedItem) {
          turnoTrabalhoStore.get(selectedItem);
        }
      }
    }, [open, selectedItem, turnoTrabalhoStore]);

    const handleChange = <K extends keyof TurnoTrabalhoForUpdateDto>(
      key: K,
      value: TurnoTrabalhoForUpdateDto[K]
    ) => {
      const dto = turnoTrabalhoStore.turnoForUpdate;
      if (dto) {
        dto[key] = value;
      }
    };

    const handleSubmit = () => {
      const dto = turnoTrabalhoStore.turnoForUpdate;
      if (dto) {
        onSave(dto);
        onOpenChange(false);
      }
    };

    const handleCancel = () => {
      onOpenChange(false);
    };

    const dto = turnoTrabalhoStore.turnoForUpdate;

    return (
      <Dialog
        open={open}
        onOpenChange={(_, data) => onOpenChange(data.open)}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Editar Turno de Trabalho</DialogTitle>

            <DialogContent>
              {dto ? (
                <form className={styles.form}>
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Código:</Label>
                    <Input
                      className={styles.input}
                      value={dto.codigo ?? ""}
                      onChange={(_, d) =>
                        handleChange("codigo", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Descrição:</Label>
                    <Input
                      className={styles.input}
                      value={dto.descricao ?? ""}
                      onChange={(_, d) =>
                        handleChange("descricao", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Entrada 1:</Label>
                    <Input
                      type="time"
                      className={styles.input}
                      value={dto.entrada1 ?? ""}
                      onChange={(_, d) =>
                        handleChange("entrada1", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Saída 1:</Label>
                    <Input
                      type="time"
                      className={styles.input}
                      value={dto.saida1 ?? ""}
                      onChange={(_, d) =>
                        handleChange("saida1", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Entrada 2:</Label>
                    <Input
                      type="time"
                      className={styles.input}
                      value={dto.entrada2 ?? ""}
                      onChange={(_, d) =>
                        handleChange("entrada2", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Saída 2:</Label>
                    <Input
                      type="time"
                      className={styles.input}
                      value={dto.saida2 ?? ""}
                      onChange={(_, d) =>
                        handleChange("saida2", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Início Vigência:</Label>
                    <DatePicker
                      formatDate={formatDateBR}
                      value={
                        dto.inicioVigencia
                          ? new Date(dto.inicioVigencia as any)
                          : undefined
                      }
                      onSelectDate={(date) =>
                        handleChange(
                          "inicioVigencia",
                          date ?? undefined
                        )
                      }
                      placeholder="Selecione uma data"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Situação:</Label>
                    <Select
                      className={styles.input}
                      value={dto.situacao ?? ""}
                      onChange={(_, data) =>
                        handleChange(
                          "situacao",
                          data.value as SituacaoTurno
                        )
                      }
                    >
                      <Option value="">Selecione</Option>
                      <Option value="Ativa">Ativa</Option>
                      <Option value="Inativa">Inativa</Option>
                    </Select>
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

export default EditTurnoTrabalhoDialog;