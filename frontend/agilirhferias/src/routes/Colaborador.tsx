import { observer } from "mobx-react-lite";
import { GenericTable } from "../components/GenericTable";
import { useStore } from "../stores/StoreContext";
import { Spinner, Text } from "@fluentui/react-components";
import type {
  ColaboradorDto,
  ColaboradorForCreateDto,
  ColaboradorForUpdateDto,
} from "../stores/ColaboradorStore";
import { useEffect, useState } from "react";
import { AddColaboradorDialog } from "../Colaborador/AddColaboradorDialog";
import EditColaboradorDialog from "../Colaborador/EditColaboradorDialog";
import { DeleteColaboradorDialog } from "../Colaborador/DeleteColaboradorDialog";
import {
  formatCurrency,
  formatDateBR,
  formatSituacao,
} from "../utils/formatUtils";

const Colaborador = observer(() => {
  const { colaboradorStore } = useStore();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ColaboradorDto>();

  useEffect(() => {
    colaboradorStore.getAll();
  }, [colaboradorStore]);

  const handleCreate = async (data: ColaboradorForCreateDto) => {
    await colaboradorStore.create(data);
    setAddDialogOpen(false);
  };

  const handleUpdate = async (data: ColaboradorForUpdateDto) => {
    await colaboradorStore.update(data);
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await colaboradorStore.delete(selectedItem.id);
      setDeleteDialogOpen(false);
    }
  };

  if (colaboradorStore.base.loading) return <Spinner label="Carregando..." />;

  if (colaboradorStore.base.error)
    return <Text>{colaboradorStore.base.error}</Text>;

  return (
    <div style={{ padding: 24 }}>
      <Text size={600} weight="semibold">
        Colaboradores
      </Text>

      <GenericTable<ColaboradorDto>
        actions
        data={colaboradorStore.colaboradores}
        columns={[
          { key: "nome", label: "Nome", width: "30%" },
          {
            key: "salario",
            label: "Salário",
            width: "10%",
            render: (item) => formatCurrency(item.salario),
          },
          {
            key: "dataAdmissao",
            label: "Admissão",
            width: "10%",
            render: (item) => formatDateBR(item.dataAdmissao),
          },
          {
            key: "dataDesligamento",
            label: "Desligamento",
            width: "10%",
            render: (item) => formatDateBR(item.dataDesligamento),
          },
          {
            key: "inicioPeriodoAquisitivo",
            label: "Período Aquisitivo",
            width: "20%",
            render: (item) =>
              `${formatDateBR(item.inicioPeriodoAquisitivo)} - ${formatDateBR(
                item.fimPeriodoAquisitivo
              )}`,
          },
          {
            key: "situacao",
            label: "Situação",
            width: "10%",
            render: (item) => formatSituacao(item.situacao),
          },
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

      <AddColaboradorDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleCreate}
      />

      {selectedItem && (
        <EditColaboradorDialog
          open={isEditDialogOpen}
          selectedItem={selectedItem.id}
          onOpenChange={setEditDialogOpen}
          onSave={handleUpdate}
        />
      )}

      <DeleteColaboradorDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem?.nome}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default Colaborador;
