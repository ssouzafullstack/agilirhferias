import { observer } from "mobx-react-lite";
import { GenericTable } from "../components/GenericTable";
import { useStore } from "../stores/StoreContext";
import { Spinner, Text } from "@fluentui/react-components";
import type {
  TurnoTrabalhoDto,
  TurnoTrabalhoForCreateDto,
  TurnoTrabalhoForUpdateDto,
} from "../stores/TurnoTrabalhoStore";
import { useEffect, useState } from "react";
import { AddTurnoTrabalhoDialog } from "../TurnoTrabalho/AddTurnoTrabalhoDialog";
import EditTurnoTrabalhoDialog from "../TurnoTrabalho/EditTurnoTrabalhoDialog";
import { DeleteTurnoTrabalhoDialog } from "../TurnoTrabalho/DeleteTurnoTrabalhoDialog";

const TurnoTrabalho = observer(() => {
  const { turnoTrabalhoStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TurnoTrabalhoDto>();

  useEffect(() => {
    turnoTrabalhoStore.getAll();
  }, [turnoTrabalhoStore]);

  const handleCreate = async (data: TurnoTrabalhoForCreateDto) => {
    await turnoTrabalhoStore.create(data);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (data: TurnoTrabalhoForUpdateDto) => {
    await turnoTrabalhoStore.update(data);
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await turnoTrabalhoStore.delete(selectedItem.id);
      setDeleteDialogOpen(false);
    }
  };

  if (turnoTrabalhoStore.base.loading)
    return <Spinner label="Carregando..." />;
  if (turnoTrabalhoStore.base.error)
    return <Text>{turnoTrabalhoStore.base.error}</Text>;

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Turnos de Trabalho
      </Text>

      <GenericTable<TurnoTrabalhoDto>
        actions
        data={turnoTrabalhoStore.turnos}
        columns={[
          { key: "codigo", label: "Código", width: "10%" },
          { key: "descricao", label: "Descrição", width: "20%" },
          { key: "entrada1", label: "Entrada 1", width: "10%" },
          { key: "saida1", label: "Saída 1", width: "10%" },
          { key: "entrada2", label: "Entrada 2", width: "10%" },
          { key: "saida2", label: "Saída 2", width: "10%" },
          { key: "inicioVigencia", label: "Início Vigência", width: "15%" },
          { key: "situacao", label: "Situação", width: "10%" },
        ]}
        onSelect={(item) => item && setSelectedItem(item)}
        onAdd={() => setAddDialogOpen(true)}
        onEdit={(item) => {
          setSelectedItem(item);
          setEditDialogOpen(true);
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setDeleteDialogOpen(true);
        }}
      />

      <AddTurnoTrabalhoDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleCreate}
      />

      {selectedItem && (
        <EditTurnoTrabalhoDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={handleUpdate}
        />
      )}

      <DeleteTurnoTrabalhoDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.descricao}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default TurnoTrabalho;