import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAddressUpdateDialogController } from "./AddressUpdateDialog.controller";
import { AddressUpdateForm } from "@presentation/components/forms/Address/AddressUpdateForm";
import { useIntl } from "react-intl";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { AddressDTO } from "@infrastructure/apis/client";

/**
 * This component wraps the Address add form into a modal dialog.
 */
export const AddressUpdateDialog = (entry: AddressDTO) => {
  const { open, close, isOpen } = useAddressUpdateDialogController();
  const { formatMessage } = useIntl();

  return <>
    <IconButton color="info" onClick={open}>
        <EditIcon color="info" fontSize='small' />
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
      Update Address
      </DialogTitle>
      <DialogContent>
        <AddressUpdateForm onSubmit={close} entry={entry}/>
      </DialogContent>
    </Dialog>
  </>
};