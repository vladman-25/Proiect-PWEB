/* eslint-disable */
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useBookTableController } from "@presentation/components/ui/Book/Book.controller";
import {BookPLP} from "@presentation/components/ui/Book/BookPLP";
import { DataLoadingContainer } from "@presentation/components/ui/LoadingDisplay";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";

export const PLP = () => {


    const { handleChangePage, handleChangePageSize, handleSearch, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useBookTableController(); // Use the controller hook.

    const [cart, setCart] = useState<{ id: string, quantity: number, title: string, author: string }[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleAddCart = (id: string, title: string, author: string) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            const updatedCart = cart.filter(item => item.id !== id);
            setCart(updatedCart);
        } else {
            const newItem = { id: id, quantity: 1, title: title, author: author};
            setCart([...cart, newItem]);
        }
    }

    console.log("cart",cart)
    return <Fragment>
        <Seo title="MobyLab Web App | PLP" />
        <WebsiteLayout>
            <Box sx={{ padding: "100px 50px 0px 50px", justifyItems: "center" }}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 'auto', marginBottom: '30px' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearch}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
                {pagedData?.data && 
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {pagedData.data.map((book) => <Grid key={book.id} item xs={6} sm={3} md={4} children={BookPLP(book, handleAddCart)}/>)}
                    </Grid>
                }
                </DataLoadingContainer>
            </Box>
        </WebsiteLayout>
    </Fragment>
};
/* eslint-enable */