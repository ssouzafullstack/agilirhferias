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
  makeStyles,
  Select,
} from "@fluentui/react-components";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import type { EmpresaForUpsertDto } from "../stores/EmpresaStore";

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

interface AddEmpresaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EmpresaForUpsertDto) => void;
}

const initialFormData: EmpresaForUpsertDto = {
  nomeFantasia: "",
  filial: false,
  cnpj: "",
  cep: "",
  situacao: 1,
  razaoSocial: "",
};

export function AddEmpresaDialog({
  open,
  onOpenChange,
  onSave,
}: AddEmpresaDialogProps) {
  const styles = useStyles();

  const [formData, setFormData] =
    React.useState<EmpresaForUpsertDto>(initialFormData);

  const handleChange = <K extends keyof EmpresaForUpsertDto>(
    key: K,
    value: EmpresaForUpsertDto[K]
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
          <DialogTitle>Adicionar empresa</DialogTitle>

          <DialogContent>
            <form className={styles.form}>
              <div className={styles.fieldRow}>
                <Label className={styles.label}>Nome fantasia:</Label>
                <Input
                  className={styles.input}
                  value={formData.nomeFantasia}
                  onChange={(_, d) =>
                    handleChange("nomeFantasia", d.value ?? "")
                  }
                  placeholder="Ex: Empresa XPTO"
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>Matriz:</Label>
                <Select
                  className={styles.input}
                  value={formData.filial ? "SIM" : "NÃO"}
                  onChange={(_, data) =>
                    handleChange("filial", data.value === "SIM")
                  }
                >
                  <option value="SIM">Matriz</option>
                  <option value="NÃO">Filial</option>
                </Select>
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>CNPJ:</Label>
                <Input
                  className={styles.input}
                  value={formData.cnpj ?? ""}
                  onChange={(_, d) => handleChange("cnpj", d.value ?? "")}
                  placeholder="Ex: 00.000.000/0000-00"
                />
              </div>

              <div className={styles.fieldRow}>
                <Label className={styles.label}>CEP:</Label>
                <Input
                  className={styles.input}
                  value={formData.cep ?? ""}
                  onChange={(_, d) => handleChange("cep", d.value ?? "")}
                  placeholder="Ex: 86000-000"
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
