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
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";
import type {
  EscalaFeriasForUpdateDto,
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

interface EditEscalaFeriasDialogProps {
  open: boolean;
  selectedItem: string;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EscalaFeriasForUpdateDto) => void;
}

const EditEscalaFeriasDialog = observer(
  ({ open, selectedItem, onOpenChange, onSave }: EditEscalaFeriasDialogProps) => {
    const styles = useStyles();
    const { escalaFeriasStore } = useStore();

    useEffect(() => {
      if (open && selectedItem) {
        if (escalaFeriasStore.escalaForUpdate?.id !== selectedItem) {
          escalaFeriasStore.get(selectedItem);
        }
      }
    }, [open, selectedItem, escalaFeriasStore]);

    const handleChange = <K extends keyof EscalaFeriasForUpdateDto>(
      key: K,
      value: EscalaFeriasForUpdateDto[K]
    ) => {
      const dto = escalaFeriasStore.escalaForUpdate;
      if (dto) {
        dto[key] = value;
      }
    };

    const handleSubmit = () => {
      const dto = escalaFeriasStore.escalaForUpdate;
      if (dto) {
        onSave(dto);
        onOpenChange(false);
      }
    };

    const handleCancel = () => {
      onOpenChange(false);
    };

    const dto = escalaFeriasStore.escalaForUpdate;

    return (
      <Dialog
        open={open}
        onOpenChange={(_, d) => onOpenChange(d.open)}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Editar escala de férias</DialogTitle>

            <DialogContent>
              {dto ? (
                <form className={styles.form}>
                  {/* Colaborador */}
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Colaborador:</Label>
                    <Input
                      className={styles.input}
                      value={dto.colaborador ?? ""}
                      onChange={(_, d) =>
                        handleChange("colaborador", d.value ?? "")
                      }
                    />
                  </div>

                  {/* Data admissão */}
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Data admissão:</Label>
                    <DatePicker
                      formatDate={formatDateBR}
                      value={
                        dto.dataAdmissao
                          ? new Date(dto.dataAdmissao as any)
                          : undefined
                      }
                      onSelectDate={(date) =>
                        handleChange("dataAdmissao", date ?? null)
                      }
                    />
                  </div>

                  {/* Período aquisitivo */}
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Período aquisitivo:</Label>
                    <Input
                      className={styles.input}
                      value={dto.periodoAquisitivo ?? ""}
                      onChange={(_, d) =>
                        handleChange("periodoAquisitivo", d.value ?? "")
                      }
                    />
                  </div>

                  {/* Dias gozo / abono / faltas / disponíveis */}
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Dias de gozo:</Label>
                    <SpinButton
                      className={styles.input}
                      value={dto.numeroDiasGozo ?? 0}
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
                      value={dto.numeroDiasAbono ?? 0}
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
                      value={dto.faltas ?? 0}
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
                      value={dto.diasDisponiveis ?? 0}
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
                        dto.inicioFerias
                          ? new Date(dto.inicioFerias as any)
                          : undefined
                      }
                      onSelectDate={(date) =>
                        handleChange("inicioFerias", date ?? null)
                      }
                    />

                    <Label className={styles.label}>Data fim:</Label>
                    <DatePicker
                      formatDate={formatDateBR}
                      value={
                        dto.fimFerias
                          ? new Date(dto.fimFerias as any)
                          : undefined
                      }
                      onSelectDate={(date) =>
                        handleChange("fimFerias", date ?? null)
                      }
                    />
                  </div>

                  {/* Situação */}
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Situação:</Label>
                    <Select
                      className={styles.input}
                      value={dto.situacao ?? ""}
                      onChange={(_, data) =>
                        handleChange(
                          "situacao",
                          data.value as SituacaoEscalaFerias
                        )
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
                      value={dto.observacao ?? ""}
                      onChange={(_, d) =>
                        handleChange("observacao", d.value ?? "")
                      }
                      resize="vertical"
                      rows={4}
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

export default EditEscalaFeriasDialog;
