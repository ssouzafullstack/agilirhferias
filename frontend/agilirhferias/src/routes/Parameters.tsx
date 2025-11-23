import { useState } from "react";
import {
  Tab,
  TabList,
  Text,
  Divider,
  type TabValue,
} from "@fluentui/react-components";
import ConfigPeriodoAquisitivo from "../parameters/ConfigPeriodoAquisitivo/ConfigPeriodoAquisitivo";
import ConfigCalculoFerias from "../parameters/ConfigCalculoFerias/ConfigCalculoFerias";
import ConfigReducaoDiasFerias from "../parameters/ConfigReducaoDiasFerias/ConfigReducaoDiasFerias";
import ConfigOrcamentoFerias from "../parameters/ConfigOrcamentoFerias/ConfigOrcamentoFerias";

export default function Parameters() {
  const [selected, setSelected] = useState<TabValue>("tab1");

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Parametrização
      </Text>

      <Divider style={{ margin: "12px 0" }} />

      <TabList
        selectedValue={selected}
        onTabSelect={(_, data) => setSelected(data.value)}
        appearance="subtle"
      >
        <Tab value="tab1">Config. período aquisitivo</Tab>
        <Tab value="tab2">Config. cálculo férias</Tab>
        <Tab value="tab3">Config. tab. redução férias</Tab>
        <Tab value="tab4">Config. orçamento férias</Tab>
      </TabList>

      <Divider style={{ margin: "12px 0" }} />

      <div style={{ marginTop: 12 }}>
        {selected === "tab1" && <ConfigPeriodoAquisitivo />}
        {selected === "tab2" && <ConfigCalculoFerias />}
        {selected === "tab3" && <ConfigReducaoDiasFerias />}
        {selected === "tab4" && <ConfigOrcamentoFerias />}
      </div>
    </div>
  );
}
