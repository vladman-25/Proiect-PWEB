import { FormController } from "../FormController";
import { BookGenreEnum } from "@infrastructure/apis/client";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type BookAddFormModel = {
    title: string;
    description: string;
    year: number;
    price: number;
    authorId: string;
    publisherId: string;
    genre: BookGenreEnum;
};

export type BookAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<BookAddFormModel>>;
};

export type BookAddFormActions = {
    register: UseFormRegister<BookAddFormModel>;
    watch: UseFormWatch<BookAddFormModel>;
    handleSubmit: UseFormHandleSubmit<BookAddFormModel>;
    submit: (body: BookAddFormModel) => void;
    selectGenre: (value: SelectChangeEvent<BookGenreEnum>) => void;
};
export type BookAddFormComputed = {
    defaultValues: BookAddFormModel,
    isSubmitting: boolean
};

export type BookAddFormController = FormController<BookAddFormState, BookAddFormActions, BookAddFormComputed>;