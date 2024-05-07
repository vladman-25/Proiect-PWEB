import { getMessagesForLanguage } from "presentation/assets/lang";
import { useLanguageState } from "application/context/LanguageContextProvider";
import { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { BookDTO } from "@infrastructure/apis/client";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";
import { useBookPDPController } from "../components/ui/Book/BookPDP.controller";
import { DataLoadingContainer } from "../components/ui/LoadingDisplay";
import { useParams } from "react-router-dom";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
/**
 * This component is used to make the internationalization available to the components it wraps.
 */

export const PDP = () => {
    const { id } = useParams();
    const { Data, isError, isLoading, tryReload } = useBookPDPController(id || ''); // Use the controller hook with a default value of an empty string for the id parameter.
    const { title, description, year, price, author } = Data ?? {}; // Destructure the data object to get the book details.


    const [quantity, setQty] = useState(1); // Create a state for the quantity of the book.
    const handleChange = (event: SelectChangeEvent<number>) => setQty(Number(event.target.value)); // Create a callback to handle the quantity change.
    const handleAddCart = (id: string, title: string, author: string) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]"); // Get the cart from localStorage or initialize it as an empty array.
        const existingItem = cart.find((item: { id: string }) => item.id === id); // Find the item in the cart with the same id.

        if (quantity === 0) {
            // If the quantity is 0, remove the item from the cart.
            if (existingItem) {
                const index = cart.indexOf(existingItem);
                cart.splice(index, 1);
            }
        } else {
            if (existingItem) {
                // If the item already exists in the cart, update its quantity.
                existingItem.quantity = quantity;
            } else {
                // If the item does not exist in the cart, add it with the specified quantity.
                cart.push({ id, quantity, title, author });
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart back to localStorage.
        console.log("Add to cart", id, quantity, title, author);
    };
    console.log("Data",Data)
    return (
        <Fragment>
            <Seo title="MobyLab Web App | PLP" />
            <WebsiteLayout>
                <Box sx={{ padding: "100px 50px 0px 50px", justifyItems: "center" }}>
                    <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
                        <Card sx={{ maxWidth: 800, margin: "auto" }} variant="outlined">
                            <CardHeader
                                title={title}
                                subheader={author?.name + " " + author?.surname + ", " + year}
                            />
                            <CardMedia
                                component="img"
                                height="500"
                                image="/src/assets/book-cover.jpg"
                                alt="Book cover"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                {description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" onClick={() => handleAddCart(id ?? 'unk', title ?? 'unk', `${author?.name} ${author?.surname}`)}>
                                <ShoppingCartIcon />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary">
                                {price + "RON"}
                                </Typography>
                                <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quantity"
                                    fullWidth
                                    defaultValue={0}
                                    onChange={(event: SelectChangeEvent<number>) => handleChange(event)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                                </FormControl>
                            </CardActions>
                        </Card>
                    </DataLoadingContainer>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
};