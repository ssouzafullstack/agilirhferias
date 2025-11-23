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
import type {
  ColaboradorForUpdateDto,
  SituacaoColaborador,
} from "../stores/ColaboradorStore";
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
    const { colaboradorStore } = useStore();

    useEffect(() => {
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
                    <Label className={styles.label}>Matrícula:</Label>
                    <Input
                      className={styles.input}
                      value={dto.matricula ?? ""}
                      onChange={(_, d) =>
                        handleChange("matricula", d.value ?? "")
                      }
                    />

                    <Label className={styles.label}>Nome:</Label>
                    <Input
                      className={styles.input}
                      value={dto.nome ?? ""}
                      onChange={(_, d) => handleChange("nome", d.value ?? "")}
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>E-mail:</Label>
                    <Input
                      className={styles.input}
                      value={dto.email ?? ""}
                      onChange={(_, d) => handleChange("email", d.value ?? "")}
                    />
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

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Salário:</Label>
                    <SpinButton
                      className={styles.input}
                      value={dto.salario ?? 0}
                      onChange={(_, d) =>
                        handleChange(
                          "salario",
                          d.value ? Number(d.value) || null : null
                        )
                      }
                    />

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
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>Cargo:</Label>
                    <Input
                      className={styles.input}
                      value={dto.cargo ?? ""}
                      onChange={(_, d) => handleChange("cargo", d.value ?? "")}
                    />

                    <Label className={styles.label}>Turno:</Label>
                    <Input
                      className={styles.input}
                      value={dto.turno ?? ""}
                      onChange={(_, d) => handleChange("turno", d.value ?? "")}
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <Label className={styles.label}>
                      Config. Período Aquisitivo:
                    </Label>
                    <Input
                      className={styles.input}
                      value={dto.configPeriodoAquisitivo ?? ""}
                      onChange={(_, d) =>
                        handleChange("configPeriodoAquisitivo", d.value ?? "")
                      }
                    />
                  </div>

                  <div className={styles.fieldRow}>
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

                  <div className={styles.fieldRow}>
                    <Checkbox
                      label="Exerce liderança"
                      checked={Boolean(dto.exerceLideranca)}
                      onChange={(_, data) =>
                        handleChange("exerceLideranca", Boolean(data.checked))
                      }
                    />

                    <Label className={styles.label}>Líder:</Label>
                    <Input
                      className={styles.input}
                      value={dto.lider ?? ""}
                      onChange={(_, d) => handleChange("lider", d.value ?? "")}
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
                          data.value as SituacaoColaborador
                        )
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

export default EditColaboradorDialog;
