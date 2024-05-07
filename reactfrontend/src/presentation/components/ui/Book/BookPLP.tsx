/* eslint-disable */
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

/**
 * This component is used to make the internationalization available to the components it wraps.
 */

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from 'react-router-dom';
import Link from '@mui/material/Link';

export const BookPLP = ({ id, title, description, year, price, author, publisher, genre }: BookDTO, handleAddCart: (id: string, title: string, author: string) => void) => {
  

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }} variant="outlined">
      <CardHeader
        title={title}
        subheader={author?.name + " " + author?.surname + ", " + year}
      />
      <Link component={RouterLink} to={`/pdp/${id}`}>
        See more
      </Link>
      <CardMedia
        component="img"
        height="194"
        image="/src/assets/book-cover.jpg"
        alt="Book cover"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleAddCart(id ?? 'unk', 
                                                                  title ?? 'unk', 
                                                                  `${author?.name} ${author?.surname}`)}>
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {price + "RON"}
        </Typography>
      </CardActions>
    </Card>);
};
/* eslint-enable */