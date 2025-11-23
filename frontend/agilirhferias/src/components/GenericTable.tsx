import * as React from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableCellLayout,
  Text,
  Button,
  Tooltip,
  Checkbox,
} from "@fluentui/react-components";
import {
  Add20Regular,
  Delete20Regular,
  Edit20Regular,
} from "@fluentui/react-icons";

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string | number;
  render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: boolean;
  selectedItem?: T | null;
  onSelect?: (item: T | null) => void;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function GenericTable<T>({
  data,
  columns,
  actions = false,
  selectedItem = null,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
}: GenericTableProps<T>) {
  const [current, setCurrent] = React.useState<T | null>(selectedItem);

  const handleSelect = (item: T) => {
    const newSelection = current === item ? null : item;
    setCurrent(newSelection);
    onSelect?.(newSelection);
  };

  const renderHeaderActions = () => {
    if (!actions) return null;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <Tooltip content="Adicionar novo registro" relationship={"label"}>
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={onAdd}
          />
        </Tooltip>
        <Tooltip content="Editar registro selecionado" relationship={"label"}>
          <Button
            appearance="subtle"
            icon={<Edit20Regular color={current ? "orange" : "none"} />}
            onClick={() => current && onEdit?.(current)}
            disabled={!current}
          />
        </Tooltip>
        <Tooltip content="Excluir registro selecionado" relationship={"label"}>
          <Button
            appearance="subtle"
            icon={<Delete20Regular color={current ? "red" : "none"} />}
            onClick={() => current && onDelete?.(current)}
            disabled={!current}
          />
        </Tooltip>
      </div>
    );
  };

  const renderRows = () => {
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={columns.length + 1}
            style={{ textAlign: "center" }}
          >
            <Text italic size={400}>
              Nenhum registro encontrado.
            </Text>
          </TableCell>
        </TableRow>
      );
    }

    return data.map((item, index) => {
      const isSelected = current === item;

      return (
        <TableRow
          key={index}
          onClick={() => handleSelect(item)}
          style={{
            cursor: "pointer",
            backgroundColor: isSelected ? "#e5f1fa" : undefined,
          }}
        >
          <TableCell style={{ width: 40 }}>
            <Checkbox
              checked={isSelected}
              onChange={() => handleSelect(item)}
            />
          </TableCell>
          {columns.map((col) => (
            <TableCell key={String(col.key)}>
              <TableCellLayout>
                {col.render ? col.render(item) : String(item[col.key] ?? "")}
              </TableCellLayout>
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <div style={{ width: "100%", marginTop: 16 }}>
      {renderHeaderActions()}

      <Table aria-label="Generic data table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell style={{ width: 40 }}>
              <Checkbox disabled />
            </TableHeaderCell>
            {columns.map((col) => (
              <TableHeaderCell
                key={String(col.key)}
                style={{ width: col.width }}
              >
                <Text weight="semibold">{col.label}</Text>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </div>
  );
}
