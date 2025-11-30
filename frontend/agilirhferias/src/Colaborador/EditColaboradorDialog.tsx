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
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";
import type { ColaboradorForUpdateDto } from "../stores/ColaboradorStore";
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

interface EditColaboradorDialogProps {
  open: boolean;
  selectedItem: string;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ColaboradorForUpdateDto) => void;
}

const EditColaboradorDialog = observer(
  ({
    open,
    selectedItem,
    onOpenChange,
    onSave,
  }: EditColaboradorDialogProps) => {
    const styles = useStyles();
    const {
      colaboradorStore,
      cargoStore,
      configPeriodoAquisitivoStore,
      empresaStore,
    } = useStore();

    useEffect(() => {
      cargoStore.getCombobox();
      configPeriodoAquisitivoStore.getCombobox();
      empresaStore.getCombobox();
      if (open && selectedItem) {
        if (colaboradorStore.colaboradorForUpdate?.id !== selectedItem) {
          colaboradorStore.get(selectedItem);
        }
      }
    }, [open, selectedItem, colaboradorStore]);

    const handleChange = <K extends keyof ColaboradorForUpdateDto>(
      key: K,
      value: ColaboradorForUpdateDto[K]
    ) => {
      const dto = colaboradorStore.colaboradorForUpdate;
      if (dto) {
        dto[key] = value;
      }
    };

    const handleSubmit = () => {
      const dto = colaboradorStore.colaboradorForUpdate;
      if (dto) {
        onSave(dto);
        onOpenChange(false);
      }
    };

    const handleCancel = () => {
      onOpenChange(false);
    };

    const dto = colaboradorStore.colaboradorForUpdate;

    return (
      <Dialog
        open={open}
        onOpenChange={(_, data) => onOpenChange(data.open)}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Editar colaborador</DialogTitle>

            <DialogContent>
              {dto ? (
                <form className={styles.form}>
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Nome:</Label>
                    <Input
                      className={styles.input}
                      value={dto.nome ?? ""}
                      onChange={(_, d) => handleChange("nome", d.value)}
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>E-mail:</Label>
                    <Input
                      className={styles.input}
                      value={dto.email}
                      onChange={(_, d) => handleChange("email", d.value)}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Empresa:</Label>
                    <Select
                      className={styles.input}
                      value={dto?.idEmpresa ?? ""}
                      onChange={(_, data) =>
                        handleChange("idEmpresa", data.value)
                      }
                    >
                      <option value="">Selecione...</option>
                      {empresaStore.combobox.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.descricao}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
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
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Data desligamento:</Label>
                      <DatePicker
                        formatDate={formatDateBR}
                        value={
                          dto.dataDesligamento
                            ? new Date(dto.dataDesligamento as any)
                            : undefined
                        }
                        onSelectDate={(date) =>
                          handleChange("dataDesligamento", date ?? null)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
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
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Cargo:</Label>
                      <Select
                        className={styles.input}
                        value={dto?.idCargo ?? ""}
                        onChange={(_, data) =>
                          handleChange("idCargo", data.value)
                        }
                      >
                        <option value="">Selecione...</option>
                        {cargoStore.combobox.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.descricao}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Turno:</Label>
                      <Input
                        className={styles.input}
                        value={dto.turno ?? ""}
                        onChange={(_, d) =>
                          handleChange("turno", d.value ?? "")
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>
                      Config. Período Aquisitivo:
                    </Label>
                    <Select
                      className={styles.input}
                      value={dto?.idConfigPeriodoAquisitivo ?? ""}
                      onChange={(_, data) =>
                        handleChange("idConfigPeriodoAquisitivo", data.value)
                      }
                    >
                      <option value="">Selecione...</option>
                      {configPeriodoAquisitivoStore.combobox.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.descricao}
                        </option>
                      ))}
                    </Select>
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
                      <Checkbox
                        label="Exerce liderança"
                        checked={dto.exerceLideranca}
                        onChange={(_, data) =>
                          handleChange("exerceLideranca", Boolean(data.checked))
                        }
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <Label className={styles.label}>Qtd. Dependentes:</Label>
                      <SpinButton
                        className={styles.input}
                        value={dto.numeroDependentes ?? 0}
                        onChange={(_, d) => {
                          const value = d.displayValue ?? "0";
                          handleChange("numeroDependentes", Number(value));
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Situação:</Label>
                    <Select
                      className={styles.input}
                      value={String(dto.situacao)}
                      onChange={(_, data) =>
                        handleChange("situacao", Number(data.value))
                      }
                    >
                      <option value="1">Ativa</option>
                      <option value="2">Inativa</option>
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

export default EditColaboradorDialog;
