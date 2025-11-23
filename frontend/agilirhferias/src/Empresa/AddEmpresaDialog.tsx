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
  Option,
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
  tipo: "",
  cnpj: "",
  cep: "",
  cidade: "",
  situacao: "",
  codigo: "",
  estado: "",
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
                <Select
                  className={styles.input}
                  value={formData.tipo}
                  onChange={(_, data) =>
                    handleChange("tipo", data.value as "Matriz" | "Filial")
                  }
                >
                  <Option value="">Selecione</Option>
                  <Option value="Matriz">Matriz</Option>
                  <Option value="Filial">Filial</Option>
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
                <Label className={styles.label}>Cidade:</Label>
                <Input
                  className={styles.input}
                  value={formData.cidade ?? ""}
                  onChange={(_, d) => handleChange("cidade", d.value ?? "")}
                  placeholder="Ex: Londrina"
                />
              </div>

              <div className={styles.fieldRow}>
                <Select
                  className={styles.input}
                  value={formData.situacao}
                  onChange={(_, data) =>
                    handleChange("situacao", data.value as "Ativa" | "Baixada")
                  }
                >
                  <Option value="">Selecione</Option>
                  <Option value="Ativa">Ativa</Option>
                  <Option value="Baixada">Baixada</Option>
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
