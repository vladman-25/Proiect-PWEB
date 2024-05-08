import { FormController } from "../FormController";
import { UserRoleEnum } from "@infrastructure/apis/client";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type UserUpdateFormModel = {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: UserRoleEnum;
};

export type UserUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<UserUpdateFormModel>>;
};

export type UserUpdateFormActions = {
    register: UseFormRegister<UserUpdateFormModel>;
    watch: UseFormWatch<UserUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<UserUpdateFormModel>;
    submit: (body: UserUpdateFormModel) => void;
    selectRole: (value: SelectChangeEvent<UserRoleEnum>) => void;
};
export type UserUpdateFormComputed = {
    defaultValues: UserUpdateFormModel,
    isSubmitting: boolean
};

export type UserUpdateFormController = FormController<UserUpdateFormState, UserUpdateFormActions, UserUpdateFormComputed>;