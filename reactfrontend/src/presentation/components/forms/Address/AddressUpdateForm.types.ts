import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type AddressUpdateFormModel = {
    id: string;
    addressField1: string;
    addressField2: string;
    city: string;
    country: string;
    zipCode: string;
};

export type AddressUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<AddressUpdateFormModel>>;
};

export type AddressUpdateFormActions = {
    register: UseFormRegister<AddressUpdateFormModel>;
    watch: UseFormWatch<AddressUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<AddressUpdateFormModel>;
    submit: (body: AddressUpdateFormModel) => void;
};
export type AddressUpdateFormComputed = {
    defaultValues: AddressUpdateFormModel,
    isSubmitting: boolean
};

export type AddressUpdateFormController = FormController<AddressUpdateFormState, AddressUpdateFormActions, AddressUpdateFormComputed>;