import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Label,
  SpinButton,
  Select,
  Textarea,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";
import type { AvisoFeriasForUpdateDto } from "../stores/AvisoFeriasStore";
import { formatDateBR } from "../utils/formatUtils";

const useStyles = makeStyles({
  fieldRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
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

interface EditAvisoFeriasDialogProps {
  open: boolean;
  selectedItem: string;
  onOpenChange: (open: boolean) => void;
  onSave: (data: AvisoFeriasForUpdateDto) => void;
}

const EditAvisoFeriasDialog = observer(
  ({
    open,
    selectedItem,
    onOpenChange,
    onSave,
  }: EditAvisoFeriasDialogProps) => {
    const styles = useStyles();
    const { avisoFeriasStore, colaboradorStore } = useStore();

    useEffect(() => {
      colaboradorStore.getCombobox();
      if (open && selectedItem) {
        if (avisoFeriasStore.avisoForUpdate?.id !== selectedItem) {
          avisoFeriasStore.get(selectedItem);
        }
      }
    }, [open, selectedItem, avisoFeriasStore]);

    const handleChange = <K extends keyof AvisoFeriasForUpdateDto>(
      key: K,
      value: AvisoFeriasForUpdateDto[K]
    ) => {
      const dto = avisoFeriasStore.avisoForUpdate;
      if (dto) {
        dto[key] = value;
      }
    };

    const handleSubmit = () => {
      const dto = avisoFeriasStore.avisoForUpdate;
      if (dto) {
        onSave(dto);
        onOpenChange(false);
      }
    };

    const handleCancel = () => {
      onOpenChange(false);
    };

    const dto = avisoFeriasStore.avisoForUpdate;

    return (
      <Dialog
        open={open}
        onOpenChange={(_, d) => onOpenChange(d.open)}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Editar aviso de férias</DialogTitle>

            <DialogContent>
              {dto ? (
                <form className={styles.form}>
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Colaborador:</Label>
                    <Select
                      className={styles.input}
                      value={dto?.idColaborador}
                      onChange={(_, data) =>
                        handleChange("idColaborador", data.value)
                      }
                    >
                      <option value="">Selecione...</option>
                      {colaboradorStore.combobox.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.descricao}
                        </option>
                      ))}
                    </Select>
                  </div>

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

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>
                        Início período aquisitivo:
                      </Label>
                      <DatePicker
                        formatDate={formatDateBR}
                        value={
                          dto.inicioPeriodoAquisitivo
                            ? new Date(dto.inicioPeriodoAquisitivo as any)
                            : undefined
                        }
                        onSelectDate={(date) =>
                          handleChange("inicioPeriodoAquisitivo", date ?? null)
                        }
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>
                        Fim período aquisitivo:
                      </Label>
                      <DatePicker
                        formatDate={formatDateBR}
                        value={
                          dto.fimPeriodoAquisitivo
                            ? new Date(dto.fimPeriodoAquisitivo as any)
                            : undefined
                        }
                        onSelectDate={(date) =>
                          handleChange("fimPeriodoAquisitivo", date ?? null)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Dias de gozo:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.numeroDiasGozo ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("numeroDiasGozo", Number(value));
                        }}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Dias de abono:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.numeroDiasAbono ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("numeroDiasAbono", Number(value));
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Faltas:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.faltas ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("faltas", Number(value));
                        }}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Dias disponíveis:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.numeroDiasDisponiveis ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("numeroDiasDisponiveis", Number(value));
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
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
                    </div>
                    <div className={styles.fieldGroup}>
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
                  </div>

                  <div className={styles.fieldRow}></div>
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Situação:</Label>
                      <Select
                        className={styles.input}
                        value={String(dto.situacao)}
                        onChange={(_, data) =>
                          handleChange("situacao", Number(data.value))
                        }
                      >
                        <option value="1">Programada</option>
                        <option value="2">Homologada</option>
                        <option value="3">Cancelada</option>
                      </Select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Salário R$:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.salario ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("salario", Number(value));
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Adicional férias:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.adicionalFerias ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("adicionalFerias", Number(value));
                        }}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Total férias:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.totalPagamentoFerias ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("totalPagamentoFerias", Number(value));
                        }}
                      />
                    </div>
                  </div>

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

export default EditAvisoFeriasDialog;
