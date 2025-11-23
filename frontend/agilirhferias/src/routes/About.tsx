import { GenericTable } from "../components/GenericTable";
import { Text, Button } from "@fluentui/react-components";

interface Company {
  id: number;
  name: string;
  cnpj: string;
  city: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "TechLabs Ltda",
    cnpj: "12.345.678/0001-90",
    city: "Curitiba",
  },
  {
    id: 2,
    name: "AgroBrasil S/A",
    cnpj: "98.765.432/0001-21",
    city: "Londrina",
  },
  { id: 3, name: "Innova TI", cnpj: "55.123.456/0001-10", city: "São Paulo" },
];

export default function About() {
  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Empresas cadastradas
      </Text>

      <GenericTable
        actions={false}
        data={companies}
        columns={[
          { key: "name", label: "Nome", width: "30%" },
          { key: "cnpj", label: "CNPJ", width: "25%" },
          { key: "city", label: "Cidade", width: "25%" },
          {
            key: "id",
            label: "Ações",
            width: "20%",
            render: (item) => (
              <Button appearance="subtle" onClick={() => alert(item.name)}>
                Ver detalhes
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
