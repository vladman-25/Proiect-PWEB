import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAuthorUpdateDialogController } from "./AuthorUpdateDialog.controller";
import { AuthorUpdateForm } from "@presentation/components/forms/Author/AuthorUpdateForm";
import { useIntl } from "react-intl";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { AuthorDTO } from "@infrastructure/apis/client";

/**
 * This component wraps the Author add form into a modal dialog.
 */
export const AuthorUpdateDialog = (entry: AuthorDTO) => {
  const { open, close, isOpen } = useAuthorUpdateDialogController();
  const { formatMessage } = useIntl();

  return <>
    <IconButton color="info" onClick={open}>
        <EditIcon color="info" fontSize='small' />
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
      Update Author
      </DialogTitle>
      <DialogContent>
        <AuthorUpdateForm onSubmit={close} entry={entry}/>
      </DialogContent>
    </Dialog>
  </>
};