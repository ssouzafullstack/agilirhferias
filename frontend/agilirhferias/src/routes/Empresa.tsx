import { observer } from "mobx-react-lite";
import { GenericTable } from "../components/GenericTable";
import { useStore } from "../stores/StoreContext";
import { Text } from "@fluentui/react-components";
import type { EmpresaDto, EmpresaForUpsertDto } from "../stores/EmpresaStore";
import { useEffect, useState } from "react";
import { AddEmpresaDialog } from "../Empresa/AddEmpresaDialog";
import EditEmpresaDialog from "../Empresa/EditEmpresaDialog";
import { DeleteEmpresaDialog } from "../Empresa/DeleteEmpresaDialog";

const Empresa = observer(() => {
  const { empresaStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EmpresaDto>();

  useEffect(() => {
    empresaStore.getAll();
  }, []);

  const handleSelect = (item: EmpresaDto) => {
    setSelectedItem(item);
  };

  const handleCreate = async (empresaForCreate: EmpresaForUpsertDto) => {
    await empresaStore.create(empresaForCreate);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (empresaForUpdate: EmpresaForUpsertDto) => {
    await empresaStore.update(empresaForUpdate);
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    await empresaStore.delete(selectedItem.id);
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Empresas
      </Text>
      <GenericTable<EmpresaDto>
        actions={true}
        data={empresaStore.empresas}
        columns={[
          {
            key: "nomeFantasia",
            label: "Código - Nome Fantasia",
            width: "30%",
          },
          {
            key: "tipo",
            label: "Filial",
            width: "25%",
          },
          { key: "cnpj", label: "CNPJ", width: "25%" },
          { key: "cep", label: "CEP", width: "25%" },
          { key: "cidade", label: "Cidade", width: "25%" },
          { key: "situacao", label: "Situação", width: "25%" },
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
      <AddEmpresaDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={(data) => handleCreate(data)}
      />
      {selectedItem && (
        <EditEmpresaDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={(data) => handleUpdate(data)}
        />
      )}
      <DeleteEmpresaDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.nomeFantasia}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default Empresa;
