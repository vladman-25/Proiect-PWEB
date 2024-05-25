import { FeedbackCheckboxEnum, FeedbackSelectEnum } from "@infrastructure/apis/client/models";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type FeedbackFormModel = {
    Descriere: string;
    Experienta: boolean;
    Nota: FeedbackSelectEnum;
    Likes: Array<FeedbackCheckboxEnum>;
};

export type FeedbackFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedbackFormModel>>;
};

export type FeedbackFormActions = {
    register: UseFormRegister<FeedbackFormModel>;
    watch: UseFormWatch<FeedbackFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedbackFormModel>;
    submit: (body: FeedbackFormModel) => void;
    selectRole: (value: SelectChangeEvent<FeedbackSelectEnum>) => void;
    handleCheckboxChange: (value: FeedbackCheckboxEnum[]) => void;
};
export type FeedbackFormComputed = {
    defaultValues: FeedbackFormModel,
    isSubmitting: boolean
};

export type FeedbackFormController = FormController<FeedbackFormState, FeedbackFormActions, FeedbackFormComputed>;