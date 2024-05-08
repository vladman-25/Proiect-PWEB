import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { BookGenreEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";

export type BookUpdateFormModel = {
    id: string;
    title: string;
    description: string;
    year: number;
    price: number;
    authorId: string;
    publisherId: string;
    genre: BookGenreEnum;
};

export type BookUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<BookUpdateFormModel>>;
};

export type BookUpdateFormActions = {
    register: UseFormRegister<BookUpdateFormModel>;
    watch: UseFormWatch<BookUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<BookUpdateFormModel>;
    submit: (body: BookUpdateFormModel) => void;
    selectGenre: (value: SelectChangeEvent<BookGenreEnum>) => void;
};
export type BookUpdateFormComputed = {
    defaultValues: BookUpdateFormModel,
    isSubmitting: boolean
};

export type BookUpdateFormController = FormController<BookUpdateFormState, BookUpdateFormActions, BookUpdateFormComputed>;