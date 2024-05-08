import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { usePublisherAddDialogController } from "./PublisherAddDialog.controller";
import { PublisherAddForm } from "@presentation/components/forms/Publisher/PublisherAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the Publisher add form into a modal dialog.
 */
export const PublisherAddDialog = () => {
  const { open, close, isOpen } = usePublisherAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      Add Publisher
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        Add Publisher
      </DialogTitle>
      <DialogContent>
        <PublisherAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};