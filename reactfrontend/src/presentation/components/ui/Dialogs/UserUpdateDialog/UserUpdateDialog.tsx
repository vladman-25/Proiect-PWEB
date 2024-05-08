import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useUserUpdateDialogController } from "./UserUpdateDialog.controller";
import { UserUpdateForm } from "@presentation/components/forms/User/UserUpdateForm";
import { useIntl } from "react-intl";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { UserDTO } from "@infrastructure/apis/client";

/**
 * This component wraps the User add form into a modal dialog.
 */
export const UserUpdateDialog = (entry: UserDTO) => {
  const { open, close, isOpen } = useUserUpdateDialogController();
  const { formatMessage } = useIntl();

  return <>
    <IconButton color="info" onClick={open}>
        <EditIcon color="info" fontSize='small' />
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
      Update User
      </DialogTitle>
      <DialogContent>
        <UserUpdateForm onSubmit={close} entry={entry}/>
      </DialogContent>
    </Dialog>
  </>
};