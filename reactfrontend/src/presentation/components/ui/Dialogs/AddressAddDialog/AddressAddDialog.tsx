import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAddressAddDialogController } from "./AddressAddDialog.controller";
import { AddressAddForm } from "@presentation/components/forms/Address/AddressAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the Address add form into a modal dialog.
 */
export const AddressAddDialog = () => {
  const { open, close, isOpen } = useAddressAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      Add Address
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        Add Address
      </DialogTitle>
      <DialogContent>
        <AddressAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};