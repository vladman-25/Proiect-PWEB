import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type AuthorUpdateFormModel = {
    id: string;
    name: string;
    surname: string;
};

export type AuthorUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<AuthorUpdateFormModel>>;
};

export type AuthorUpdateFormActions = {
    register: UseFormRegister<AuthorUpdateFormModel>;
    watch: UseFormWatch<AuthorUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<AuthorUpdateFormModel>;
    submit: (body: AuthorUpdateFormModel) => void;
};
export type AuthorUpdateFormComputed = {
    defaultValues: AuthorUpdateFormModel,
    isSubmitting: boolean
};

export type AuthorUpdateFormController = FormController<AuthorUpdateFormState, AuthorUpdateFormActions, AuthorUpdateFormComputed>;