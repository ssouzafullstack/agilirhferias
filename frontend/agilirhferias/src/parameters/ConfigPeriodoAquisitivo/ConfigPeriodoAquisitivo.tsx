import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/StoreContext";
import { useEffect, useState } from "react";
import { Spinner, Text } from "@fluentui/react-components";
import { GenericTable } from "../../components/GenericTable";
import type {
  ConfigPeriodoAquisitivoDto,
  ConfigPeriodoAquisitivoForCreateDto,
  ConfigPeriodoAquisitivoForUpdateDto,
} from "../../stores/ConfigPeriodoAquisitivoStore";
import { AddConfigPeriodoAquisitivoDialog } from "./AddConfigPeriodoAquisitivoDialog";
import EditConfigPeriodoAquisitivoDialog from "./EditConfigPeriodoAquisitivoDialog";
import { DeleteConfigPeriodoAquisitivoDialog } from "./DeleteConfigPeriodoAquisitivoDialog";

const ConfigPeriodoAquisitivo = observer(() => {
  const { configPeriodoAquisitivoStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ConfigPeriodoAquisitivoDto>();

  useEffect(() => {
    configPeriodoAquisitivoStore.getAll();
  }, []);

  const handleSelect = (item: ConfigPeriodoAquisitivoDto) => {
    setSelectedItem(item);
  };

  const handleCreate = async (
    configPeriodoAquisitivoForCreate: ConfigPeriodoAquisitivoForCreateDto
  ) => {
    await configPeriodoAquisitivoStore.create(configPeriodoAquisitivoForCreate);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (
    configPeriodoAquisitivoForUupdate: ConfigPeriodoAquisitivoForUpdateDto
  ) => {
    await configPeriodoAquisitivoStore.update(
      configPeriodoAquisitivoForUupdate
    );
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    await configPeriodoAquisitivoStore.delete(selectedItem.id);
    setDeleteDialogOpen(false);
  };

  if (configPeriodoAquisitivoStore.base.loading)
    return <Spinner label="Carregando ..." />;
  if (configPeriodoAquisitivoStore.base.error)
    return <Text>{configPeriodoAquisitivoStore.base.error}</Text>;

  return (
    <div style={{ padding: 24 }}>
      <GenericTable<ConfigPeriodoAquisitivoDto>
        actions={true}
        data={configPeriodoAquisitivoStore.configsPeriodoAquisitivo}
        columns={[
          { key: "descricao", label: "Descrição", width: "30%" },
          {
            key: "numeroMesesTrabalhados",
            label: "Qtd Meses Trabalhados",
            width: "25%",
          },
          { key: "numeroDiasGozo", label: "Qtd Dias Gozo", width: "25%" },
          { key: "inicioVigencia", label: "Inicio Vigência", width: "25%" },
        ]}
        onSelect={(item) => {
          if (item) handleSelect(item);
        }}
        onAdd={() => setAddDialogOpen(true)}
        onEdit={(item) => {
          if (item) {
            setSelectedItem(item);
            setEditDialogOpen(true);
          }
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setDeleteDialogOpen(true);
        }}
      />
      <AddConfigPeriodoAquisitivoDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={(data) => handleCreate(data)}
      />
      {selectedItem && (
        <EditConfigPeriodoAquisitivoDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={(data) => handleUpdate(data)}
        />
      )}
      <DeleteConfigPeriodoAquisitivoDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.descricao}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default ConfigPeriodoAquisitivo;
