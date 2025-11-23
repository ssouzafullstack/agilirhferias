import { observer } from "mobx-react-lite";
import { GenericTable } from "../components/GenericTable";
import { useStore } from "../stores/StoreContext";
import { Spinner, Text } from "@fluentui/react-components";
import type {
  CargoDto,
  CargoForCreateDto,
  CargoForUpdateDto,
} from "../stores/CargoStore";
import { useEffect, useState } from "react";
import { AddCargoDialog } from "../Cargo/AddCargoDialog";
import EditCargoDialog from "../Cargo/EditCargoDialog";
import { DeleteCargoDialog } from "../Cargo/DeleteCargoDialog";

const Cargo = observer(() => {
  const { cargoStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CargoDto>();

  useEffect(() => {
    cargoStore.getAll();
  }, [cargoStore]);

  const handleSelect = (item: CargoDto) => {
    setSelectedItem(item);
  };

  const handleCreate = async (cargoForCreate: CargoForCreateDto) => {
    await cargoStore.create(cargoForCreate);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (cargoForUpdate: CargoForUpdateDto) => {
    await cargoStore.update(cargoForUpdate);
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    await cargoStore.delete(selectedItem.id);
    setDeleteDialogOpen(false);
  };

  if (cargoStore.base.loading) {
    return <Spinner label="Carregando ..." />;
  }

  if (cargoStore.base.error) {
    return <Text>{cargoStore.base.error}</Text>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Cargos
      </Text>

      <GenericTable<CargoDto>
        actions={true}
        data={cargoStore.cargos}
        columns={[
          { key: "codigo", label: "Código", width: "10%" },
          { key: "nome", label: "Nome", width: "25%" },
          { key: "nivel", label: "Nível", width: "15%" },
          { key: "cbo", label: "CBO", width: "10%" },
          {
            key: "gerenciaSupervisao",
            label: "Gerência/Supervisão",
            width: "15%",
          },
          {
            key: "inicioVigencia",
            label: "Início de Vigência",
            width: "15%",
          },
          { key: "situacao", label: "Situação", width: "10%" },
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
          if (item) {
            setSelectedItem(item);
            setDeleteDialogOpen(true);
          }
        }}
      />

      <AddCargoDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleCreate}
      />

      {selectedItem && (
        <EditCargoDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={handleUpdate}
        />
      )}

      <DeleteCargoDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.nome}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default Cargo;
