import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type AddressAddFormModel = {
    addressField1: string;
    addressField2: string;
    city: string;
    country: string;
    zipCode: string;
};

export type AddressAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<AddressAddFormModel>>;
};

export type AddressAddFormActions = {
    register: UseFormRegister<AddressAddFormModel>;
    watch: UseFormWatch<AddressAddFormModel>;
    handleSubmit: UseFormHandleSubmit<AddressAddFormModel>;
    submit: (body: AddressAddFormModel) => void;
};
export type AddressAddFormComputed = {
    defaultValues: AddressAddFormModel,
    isSubmitting: boolean
};

export type AddressAddFormController = FormController<AddressAddFormState, AddressAddFormActions, AddressAddFormComputed>;