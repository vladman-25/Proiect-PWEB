import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { usePublisherUpdateDialogController } from "./PublisherUpdateDialog.controller";
import { PublisherUpdateForm } from "@presentation/components/forms/Publisher/PublisherUpdateForm";
import { useIntl } from "react-intl";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { PublisherDTO } from "@infrastructure/apis/client";

/**
 * This component wraps the Publisher add form into a modal dialog.
 */
export const PublisherUpdateDialog = (entry: PublisherDTO) => {
  const { open, close, isOpen } = usePublisherUpdateDialogController();
  const { formatMessage } = useIntl();

  return <>
    <IconButton color="info" onClick={open}>
        <EditIcon color="info" fontSize='small' />
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
      Update Publisher
      </DialogTitle>
      <DialogContent>
        <PublisherUpdateForm onSubmit={close} entry={entry}/>
      </DialogContent>
    </Dialog>
  </>
};