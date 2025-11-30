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
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";
import type { CargoForUpdateDto, SituacaoCargo } from "../stores/CargoStore";
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

interface EditCargoDialogProps {
  open: boolean;
  selectedItem: string;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CargoForUpdateDto) => void;
}

const EditCargoDialog = observer(
  ({ open, selectedItem, onOpenChange, onSave }: EditCargoDialogProps) => {
    const styles = useStyles();
    const { cargoStore } = useStore();

    useEffect(() => {
      if (open && selectedItem) {
        if (cargoStore.cargoForUpdate?.id !== selectedItem) {
          cargoStore.get(selectedItem);
        }
      }
    }, [open, selectedItem, cargoStore]);

    const handleChange = <K extends keyof CargoForUpdateDto>(
      key: K,
      value: CargoForUpdateDto[K]
    ) => {
      const dto = cargoStore.cargoForUpdate;
      if (dto) {
        dto[key] = value;
      }
    };

    const handleSubmit = () => {
      const dto = cargoStore.cargoForUpdate;
      if (dto) {
        onSave(dto);
        onOpenChange(false);
      }
    };

    const handleCancel = () => {
      onOpenChange(false);
    };

    const dto = cargoStore.cargoForUpdate;

    return (
      <Dialog
        open={open}
        onOpenChange={(_, data) => onOpenChange(data.open)}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Editar cargo</DialogTitle>

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
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Descrição:</Label>
                    <Input
                      className={styles.input}
                      value={dto.descricao ?? ""}
                      onChange={(_, d) => handleChange("descricao", d.value ?? "")}
                      placeholder="Ex: Analista de RH"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Nível:</Label>
                    <Input
                      className={styles.input}
                      value={dto.nivelCargo ?? ""}
                      onChange={(_, d) => handleChange("nivelCargo", d.value ?? "")}
                      placeholder="Ex: Júnior / Pleno / Sênior"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>CBO:</Label>
                    <Input
                      className={styles.input}
                      value={dto.cbo ?? ""}
                      onChange={(_, d) => handleChange("cbo", d.value ?? "")}
                      placeholder="Ex: 2524-05"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Checkbox
                      label="Gerência / Supervisão"
                      checked={dto.gerenciaSupervisao ?? false}
                      onChange={(_, data) =>
                        handleChange(
                          "gerenciaSupervisao",
                          Boolean(data.checked)
                        )
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Início de vigência:</Label>
                    <DatePicker
                      formatDate={formatDateBR}
                      value={
                        dto.inicioVigencia
                          ? new Date(dto.inicioVigencia as any)
                          : undefined
                      }
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
                      value={dto.situacao ?? ""}
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

export default EditCargoDialog;
