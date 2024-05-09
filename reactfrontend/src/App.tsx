import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { PLP } from "@presentation/pages/PLP";
import { PDP } from "@presentation/pages/PDP";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthorsPage } from "@presentation/pages/AuthorsPage";
import { BooksPage } from "@presentation/pages/BooksPage";
import { PublishersPage } from "@presentation/pages/PublishersPage";
import { AddresssPage } from "@presentation/pages/AddresssPage";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [cartItems, setCartIitems] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  const handleDelete = (itemId: string) => {
    const updatedCartItems = cartItems.filter((item: { id: string }) => item.id !== itemId);
    setCartIitems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  return (
    <AppIntlProvider>
      {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<PLP />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path={AppRoute.Plp} element={<PLP />} />
        <Route path={AppRoute.Pdp} element={<PDP />} />
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.Authors} element={<AuthorsPage />} />}
        {isAdmin && <Route path={AppRoute.Books} element={<BooksPage />} />}
        {isAdmin && <Route path={AppRoute.Publishers} element={<PublishersPage />} />}
        {isAdmin && <Route path={AppRoute.Addresss} element={<AddresssPage />} />}
      </Routes>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: '10px', top: '100px' }}
        onClick={handleOpen}
      >
        <ShoppingCartIcon />
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cart
          </Typography>
          <List dense={false}>
            {cartItems.map((item: { id: string, quantity: number, title: string, author: string }) => (
                <>
                  <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                    <ListItemText
                          primary={`${item.title} x ${item.quantity}`}
                          secondary={`${item.author}`}
                        />
                  </ListItem>
                  <Divider />
                </>
            ))}
          </List>
        </Box>
      </Modal>

  
    </AppIntlProvider>
  );
}
