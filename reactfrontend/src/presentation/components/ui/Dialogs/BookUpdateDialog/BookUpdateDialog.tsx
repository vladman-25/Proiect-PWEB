import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useBookUpdateDialogController } from "./BookUpdateDialog.controller";
import { BookUpdateForm } from "@presentation/components/forms/Book/BookUpdateForm";
import { useIntl } from "react-intl";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { BookDTO } from "@infrastructure/apis/client";

/**
 * This component wraps the Book add form into a modal dialog.
 */
export const BookUpdateDialog = (entry: BookDTO) => {
  const { open, close, isOpen } = useBookUpdateDialogController();
  const { formatMessage } = useIntl();

  return <>
    <IconButton color="info" onClick={open}>
        <EditIcon color="info" fontSize='small' />
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
      Update Book
      </DialogTitle>
      <DialogContent>
        <BookUpdateForm onSubmit={close} entry={entry}/>
      </DialogContent>
    </Dialog>
  </>
};