import * as React from "react";
import {
  Spinner,
  Text,
  Label,
  makeStyles,
  Button,
  Divider,
  SpinButton,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/StoreContext";
import type { ConfigOrcamentoFeriasForUpdateDto } from "../../stores/ConfigOrcamentoFeriasStore";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
    maxWidth: "900px",
  },
  section: {
    border: "1px solid #d1d1d1",
    borderRadius: "8px",
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 32px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  label: {
    minWidth: "100px",
  },
  dateRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  },
});

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const ConfigOrcamentoFerias = observer(() => {
  const styles = useStyles();
  const { configOrcamentoFeriasStore } = useStore();

  const [form, setForm] = React.useState<ConfigOrcamentoFeriasForUpdateDto>({
    id: "",
    faixasOrcamentoFerias: Array.from({ length: 12 }, (_, i) => ({
      id: "",
      mes: i + 1,
      orcamento: 0,
    })),
    ultimaAlteracao: null,
  });

  React.useEffect(() => {
    configOrcamentoFeriasStore.get().then(() => {
      const cfg = configOrcamentoFeriasStore.config;
      if (cfg) setForm(cfg);
    });
  }, []);

  const handleChangeFaixa = (index: number, value: number) => {
    setForm((prev) => {
      const faixas = [...prev.faixasOrcamentoFerias];
      faixas[index] = { ...faixas[index], orcamento: value };
      return { ...prev, faixasOrcamentoFerias: faixas };
    });
  };

  const handleChange = <K extends keyof ConfigOrcamentoFeriasForUpdateDto>(
    key: K,
    value: ConfigOrcamentoFeriasForUpdateDto[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const onFormatDate = (date?: Date | string): string => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  const handleSave = async () => {
    await configOrcamentoFeriasStore.update(form);
  };

  const handleCancel = () => {
    const cfg = configOrcamentoFeriasStore.config;
    if (cfg) setForm(cfg);
  };

  if (configOrcamentoFeriasStore.loading)
    return <Spinner label="Carregando configuração..." />;
  if (configOrcamentoFeriasStore.error)
    return <Text>{configOrcamentoFeriasStore.error}</Text>;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {form.faixasOrcamentoFerias.map((faixa, i) => (
          <div key={faixa.mes} className={styles.row}>
            <Label className={styles.label}>{MESES[faixa.mes - 1]}: R$</Label>
            <SpinButton
              value={faixa.orcamento ?? 0}
              onChange={(_, d) => handleChangeFaixa(i, Number(d.value) || 0)}
            />
          </div>
        ))}
      </div>

      <div className={styles.dateRow}>
        <Label>Última alteração</Label>
        <DatePicker
          value={form.ultimaAlteracao ?? null}
          onSelectDate={(d) => handleChange("ultimaAlteracao", d ?? null)}
          formatDate={onFormatDate}
        />
      </div>

      <Divider />

      <div className={styles.actions}>
        <Button
          appearance="primary"
          icon={<Save20Regular />}
          onClick={handleSave}
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
      </div>
    </div>
  );
});

export default ConfigOrcamentoFerias;
