import { observer } from "mobx-react-lite";
import { GenericTable } from "../components/GenericTable";
import { useStore } from "../stores/StoreContext";
import { Spinner, Text } from "@fluentui/react-components";
import type {
  EscalaFeriasDto,
  EscalaFeriasForCreateDto,
  EscalaFeriasForUpdateDto,
} from "../stores/EscalaFeriasStore";
import { useEffect, useState } from "react";
import { AddEscalaFeriasDialog } from "../EscalaFerias/AddEscalaFeriasDialog";
import EditEscalaFeriasDialog from "../EscalaFerias/EditEscalaFeriasDialog";
import { DeleteEscalaFeriasDialog } from "../EscalaFerias/DeleteEscalaFeriasDialog";

const EscalaFerias = observer(() => {
  const { escalaFeriasStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EscalaFeriasDto>();

  useEffect(() => {
    escalaFeriasStore.getAll();
  }, [escalaFeriasStore]);

  const handleCreate = async (data: EscalaFeriasForCreateDto) => {
    await escalaFeriasStore.create(data);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (data: EscalaFeriasForUpdateDto) => {
    await escalaFeriasStore.update(data);
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await escalaFeriasStore.delete(selectedItem.id);
      setDeleteDialogOpen(false);
    }
  };

  if (escalaFeriasStore.base.loading) return <Spinner label="Carregando..." />;

  if (escalaFeriasStore.base.error)
    return <Text>{escalaFeriasStore.base.error}</Text>;

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Escala de Férias
      </Text>

      <GenericTable<EscalaFeriasDto>
        actions
        data={escalaFeriasStore.escalas}
        columns={[
          { key: "colaborador", label: "Colaborador", width: "25%" },
          { key: "dataAdmissao", label: "Admissão", width: "10%" },
          {
            key: "periodoAquisitivo",
            label: "Período Aquisitivo",
            width: "15%",
          },
          { key: "numeroDiasGozo", label: "Dias Gozo", width: "10%" },
          { key: "numeroDiasAbono", label: "Dias Abono", width: "10%" },
          { key: "inicioFerias", label: "Início", width: "10%" },
          { key: "fimFerias", label: "Fim", width: "10%" },
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

      <AddEscalaFeriasDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleCreate}
      />

      {selectedItem && (
        <EditEscalaFeriasDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={handleUpdate}
        />
      )}

      <DeleteEscalaFeriasDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.colaborador}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default EscalaFerias;
