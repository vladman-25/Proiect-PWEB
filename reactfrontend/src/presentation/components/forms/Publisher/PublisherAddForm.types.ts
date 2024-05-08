import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type PublisherAddFormModel = {
    name: string;
    address: string;
    phone: string;
};

export type PublisherAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<PublisherAddFormModel>>;
};

export type PublisherAddFormActions = {
    register: UseFormRegister<PublisherAddFormModel>;
    watch: UseFormWatch<PublisherAddFormModel>;
    handleSubmit: UseFormHandleSubmit<PublisherAddFormModel>;
    submit: (body: PublisherAddFormModel) => void;
};
export type PublisherAddFormComputed = {
    defaultValues: PublisherAddFormModel,
    isSubmitting: boolean
};

export type PublisherAddFormController = FormController<PublisherAddFormState, PublisherAddFormActions, PublisherAddFormComputed>;