import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Text,
} from "@fluentui/react-components";
import { Dismiss20Regular, Delete20Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingTop: "8px",
  },
});

interface DeleteCargoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: string;
  onConfirm: () => void;
}

export const DeleteCargoDialog: React.FC<DeleteCargoDialogProps> = ({
  open,
  onOpenChange,
  item,
  onConfirm,
}) => {
  const styles = useStyles();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => onOpenChange(data.open)}
      modalType="modal"
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Excluir cargo</DialogTitle>
          <DialogContent className={styles.content}>
            <Text>
              Tem certeza que deseja excluir{" "}
              {item ? <b>{item}</b> : "este cargo"}?
            </Text>
            <span style={{ color: "#a4262c", fontSize: 12 }}>
              Esta ação não poderá ser desfeita.
            </span>
          </DialogContent>
          <DialogActions>
            <Button
              appearance="secondary"
              icon={<Dismiss20Regular />}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              appearance="primary"
              style={{ backgroundColor: "#a4262c" }}
              icon={<Delete20Filled />}
              onClick={handleConfirm}
            >
              Excluir
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};