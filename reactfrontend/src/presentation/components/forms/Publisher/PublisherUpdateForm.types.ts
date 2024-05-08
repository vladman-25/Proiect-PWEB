import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type PublisherUpdateFormModel = {
    id: string;
    name: string;
    address: string;
    phone: string;
};

export type PublisherUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<PublisherUpdateFormModel>>;
};

export type PublisherUpdateFormActions = {
    register: UseFormRegister<PublisherUpdateFormModel>;
    watch: UseFormWatch<PublisherUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<PublisherUpdateFormModel>;
    submit: (body: PublisherUpdateFormModel) => void;
};
export type PublisherUpdateFormComputed = {
    defaultValues: PublisherUpdateFormModel,
    isSubmitting: boolean
};

export type PublisherUpdateFormController = FormController<PublisherUpdateFormState, PublisherUpdateFormActions, PublisherUpdateFormComputed>;