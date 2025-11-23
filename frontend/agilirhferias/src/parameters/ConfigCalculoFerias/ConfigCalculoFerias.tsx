import * as React from "react";
import {
  RadioGroup,
  Radio,
  Button,
  Label,
  Text,
  Divider,
  makeStyles,
  Spinner,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/StoreContext";
import type { ConfigCalculoFeriasForUpdateDto } from "../../stores/ConfigCalculoFeriasStore";
import { formatDateBR } from "../../utils/formatDateBR";

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
  },
  groupTitle: {
    marginBottom: "8px",
    fontWeight: 600,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "24px",
  },
  dateRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
});

const ConfigCalculoFerias = observer(() => {
  const styles = useStyles();
  const { configCalculoFeriasStore } = useStore();

  const [form, setForm] = React.useState<ConfigCalculoFeriasForUpdateDto>({
    id: "",
    multiplicarSempreNumeroDiasMes: false,
    multiplicarSempreTrintaDias: false,
    dividirSempreNumeroDiasMes: false,
    dividirSempreTrintaDias: false,
    dividirFevereiroTrintaDias: false,
    ultimaAlteracao: null,
  });

  React.useEffect(() => {
    configCalculoFeriasStore.get().then(() => {
      const config = configCalculoFeriasStore.configCalculoFerias;
      if (config) setForm(config);
    });
  }, []);

  const handleChange = <K extends keyof ConfigCalculoFeriasForUpdateDto>(
    key: K,
    value: ConfigCalculoFeriasForUpdateDto[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));
  
  const handleSave = async () => {
    await configCalculoFeriasStore.update(form);
  };

  const handleCancel = () => {
    const cfg = configCalculoFeriasStore.configCalculoFerias;
    if (cfg) setForm(cfg);
  };

  if (configCalculoFeriasStore.loading)
    return <Spinner label="Carregando configuração..." />;

  if (configCalculoFeriasStore.error)
    return <Text>{configCalculoFeriasStore.error}</Text>;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text className={styles.groupTitle}>
          Dias a considerar no mês (multiplicador)
        </Text>
        <RadioGroup
          layout="vertical"
          value={
            form.multiplicarSempreNumeroDiasMes
              ? "mes"
              : form.multiplicarSempreTrintaDias
              ? "30"
              : ""
          }
          onChange={(_, d) => {
            handleChange("multiplicarSempreNumeroDiasMes", d.value === "mes");
            handleChange("multiplicarSempreTrintaDias", d.value === "30");
          }}
        >
          <Radio value="mes" label="Considerar sempre número de dias do mês" />
          <Radio value="30" label="Considerar sempre 30 dias" />
        </RadioGroup>
      </div>

      <div className={styles.section}>
        <Text className={styles.groupTitle}>Valor salário/dia (divisor)</Text>
        <RadioGroup
          layout="vertical"
          value={
            form.dividirSempreNumeroDiasMes
              ? "mes"
              : form.dividirSempreTrintaDias
              ? "30"
              : form.dividirFevereiroTrintaDias
              ? "fevereiro"
              : ""
          }
          onChange={(_, d) => {
            handleChange("dividirSempreNumeroDiasMes", d.value === "mes");
            handleChange("dividirSempreTrintaDias", d.value === "30");
            handleChange("dividirFevereiroTrintaDias", d.value === "fevereiro");
          }}
        >
          <Radio value="mes" label="Considerar sempre número de dias do mês" />
          <Radio value="30" label="Considerar sempre 30 dias" />
          <Radio
            value="fevereiro"
            label="Em fevereiro considerar dias do mês"
          />
        </RadioGroup>
      </div>

      <div className={styles.dateRow}>
        <Label>Última alteração</Label>
        <DatePicker
          value={form.ultimaAlteracao ?? null}
          onSelectDate={(date) => handleChange("ultimaAlteracao", date ?? null)}
          formatDate={formatDateBR}
          disabled
        />
      </div>

      <Divider />

      <div className={styles.actions}>
        <Button
          appearance="primary"
          icon={<Save20Regular />}
          onClick={handleSave}
          disabled={configCalculoFeriasStore.loading}
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

export default ConfigCalculoFerias;
