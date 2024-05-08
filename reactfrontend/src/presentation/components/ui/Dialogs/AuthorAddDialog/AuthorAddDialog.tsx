import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAuthorAddDialogController } from "./AuthorAddDialog.controller";
import { AuthorAddForm } from "@presentation/components/forms/Author/AuthorAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the Author add form into a modal dialog.
 */
export const AuthorAddDialog = () => {
  const { open, close, isOpen } = useAuthorAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      Add Author
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        Add Author
      </DialogTitle>
      <DialogContent>
        <AuthorAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};