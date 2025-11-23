import { observer } from "mobx-react-lite";
import { GenericTable } from "../components/GenericTable";
import { useStore } from "../stores/StoreContext";
import { Spinner, Text } from "@fluentui/react-components";
import type {
  AvisoFeriasDto,
  AvisoFeriasForCreateDto,
  AvisoFeriasForUpdateDto,
} from "../stores/AvisoFeriasStore";
import { useEffect, useState } from "react";
import { AddAvisoFeriasDialog } from "../AvisoFerias/AddAvisoFeriasDialog";
import EditAvisoFeriasDialog from "../AvisoFerias/EditAvisoFeriasDialog";
import { DeleteAvisoFeriasDialog } from "../AvisoFerias/DeleteAvisoFeriasDialog";

const AvisoFerias = observer(() => {
  const { avisoFeriasStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AvisoFeriasDto>();

  useEffect(() => {
    avisoFeriasStore.getAll();
  }, [avisoFeriasStore]);

  const handleCreate = async (data: AvisoFeriasForCreateDto) => {
    await avisoFeriasStore.create(data);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (data: AvisoFeriasForUpdateDto) => {
    await avisoFeriasStore.update(data);
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await avisoFeriasStore.delete(selectedItem.id);
      setDeleteDialogOpen(false);
    }
  };

  if (avisoFeriasStore.base.loading) return <Spinner label="Carregando..." />;

  if (avisoFeriasStore.base.error)
    return <Text>{avisoFeriasStore.base.error}</Text>;

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Aviso de Férias
      </Text>

      <GenericTable<AvisoFeriasDto>
        actions
        data={avisoFeriasStore.avisos}
        columns={[
          { key: "colaborador", label: "Colaborador", width: "22%" },
          { key: "dataAdmissao", label: "Admissão", width: "10%" },
          {
            key: "periodoAquisitivo",
            label: "Período Aquisitivo",
            width: "13%",
          },
          { key: "diasGozo", label: "Dias Gozo", width: "8%" },
          { key: "diasAbono", label: "Dias Abono", width: "8%" },
          { key: "dataInicio", label: "Início", width: "10%" },
          { key: "dataFim", label: "Fim", width: "10%" },
          { key: "adicionalFerias", label: "Adic. Férias", width: "9%" },
          { key: "totalFerias", label: "Total Férias", width: "10%" },
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

      <AddAvisoFeriasDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleCreate}
      />

      {selectedItem && (
        <EditAvisoFeriasDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={handleUpdate}
        />
      )}

      <DeleteAvisoFeriasDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.colaborador}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default AvisoFerias;
