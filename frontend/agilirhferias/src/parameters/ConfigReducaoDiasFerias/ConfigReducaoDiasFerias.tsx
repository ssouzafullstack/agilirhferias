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
import type {
  ConfigReducaoDiasFeriasForUpdateDto,
  FaixaReducaoDiasFeriasDto,
} from "../../stores/ConfigReducaoDiasFeriasStore";

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
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  label: {
    minWidth: "150px",
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

const ConfigReducaoDiasFerias = observer(() => {
  const styles = useStyles();
  const { configReducaoDiasFeriasStore } = useStore();

  const [form, setForm] = React.useState<ConfigReducaoDiasFeriasForUpdateDto>({
    id: "",
    faixasReducaoDiasFerias: [
      {
        id: "",
        numeroDiasFaltaInicial: 0,
        numeroDiasFaltaFinal: 5,
        numeroDiasFerias: 30,
      },
      {
        id: "",
        numeroDiasFaltaInicial: 6,
        numeroDiasFaltaFinal: 14,
        numeroDiasFerias: 24,
      },
      {
        id: "",
        numeroDiasFaltaInicial: 15,
        numeroDiasFaltaFinal: 23,
        numeroDiasFerias: 18,
      },
      {
        id: "",
        numeroDiasFaltaInicial: 24,
        numeroDiasFaltaFinal: 32,
        numeroDiasFerias: 12,
      },
      {
        id: "",
        numeroDiasFaltaInicial: 33,
        numeroDiasFaltaFinal: 99,
        numeroDiasFerias: 0,
      },
    ],
    ultimaAlteracao: null,
  });

  React.useEffect(() => {
    configReducaoDiasFeriasStore.get().then(() => {
      const cfg = configReducaoDiasFeriasStore.config;
      if (cfg) setForm(cfg);
    });
  }, []);

  const handleChangeFaixa = (
    index: number,
    field: keyof FaixaReducaoDiasFeriasDto,
    value: number
  ) => {
    setForm((prev) => {
      const faixas = [...prev.faixasReducaoDiasFerias];
      faixas[index] = { ...faixas[index], [field]: value };
      return { ...prev, faixasReducaoDiasFerias: faixas };
    });
  };

  const handleChange = <K extends keyof ConfigReducaoDiasFeriasForUpdateDto>(
    key: K,
    value: ConfigReducaoDiasFeriasForUpdateDto[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const onFormatDate = (date?: Date | string): string => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  const handleSave = async () => {
    await configReducaoDiasFeriasStore.update(form);
  };

  const handleCancel = () => {
    const cfg = configReducaoDiasFeriasStore.config;
    if (cfg) setForm(cfg);
  };

  if (configReducaoDiasFeriasStore.loading)
    return <Spinner label="Carregando configuração..." />;
  if (configReducaoDiasFeriasStore.error)
    return <Text>{configReducaoDiasFeriasStore.error}</Text>;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {form.faixasReducaoDiasFerias.map((faixa, i) => (
          <div className={styles.row} key={i}>
            {faixa.numeroDiasFaltaInicial > 32 ? (
              <Label className={styles.label}>Acima de 32 faltas:</Label>
            ) : (
              <Label className={styles.label}>
                De {faixa.numeroDiasFaltaInicial.toString().padStart(2, "0")} à{" "}
                {faixa.numeroDiasFaltaFinal.toString().padStart(2, "0")} faltas:
              </Label>
            )}
            <SpinButton
              value={faixa.numeroDiasFerias ?? 0}
              onChange={(_, d) =>
                handleChangeFaixa(i, "numeroDiasFerias", Number(d.value) || 0)
              }
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

export default ConfigReducaoDiasFerias;
