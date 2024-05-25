import { FeedbackFormController, FeedbackFormModel } from "./FeedbackForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { Resolver, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFeedbackApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { FeedbackAddDTO, FeedbackCheckboxEnum, FeedbackSelectEnum } from "@infrastructure/apis/client";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: FeedbackFormModel) => {
    const defaultValues = {
        Descriere: "",
        Experienta: true,
        Nota: FeedbackSelectEnum.Nota5,
        Likes: [FeedbackCheckboxEnum.Accessible],
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitFeedbackForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        Descriere: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "Descriere"
                }))
            .default(defaultValues.Descriere),
        Experienta: yup.boolean()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "Experienta"
                }))
            .default(true),
        Nota: yup.string()
            .oneOf([ // The select input should have one of these values.
                FeedbackSelectEnum.Nota1,
                FeedbackSelectEnum.Nota2,
                FeedbackSelectEnum.Nota3,
                FeedbackSelectEnum.Nota4,
                FeedbackSelectEnum.Nota5
                ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "Nota"
                }))
            .default(FeedbackSelectEnum.Nota5),
        Likes: yup.array().of(yup.string().oneOf([ // The select input should have one of these values.
        FeedbackCheckboxEnum.Accessible,
        FeedbackCheckboxEnum.Speed,
        FeedbackCheckboxEnum.Responsive,
        FeedbackCheckboxEnum.WebPages
        ]))
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "Likes"
                }))
            .default([FeedbackCheckboxEnum.Accessible]),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const mapFormModelToFeedbackDTO = (Feedback: FeedbackFormModel): FeedbackAddDTO => { 
    return { descriere: Feedback.Descriere,
            experienta: Feedback.Experienta, 
            nota: Feedback.Nota,
            likes: Feedback.Likes.map((like) => ({ like: like })) ?? [FeedbackCheckboxEnum.Accessible],
        }; };
/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useFeedbackFormController = (onSubmit?: () => void): FeedbackFormController => {
    const { defaultValues, resolver } = useInitFeedbackForm();
    const { addFeedback: { mutation, key: mutationKey }, getFeedbacks: { key: queryKey } } = useFeedbackApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: FeedbackFormModel) => // Create a submit callback to send the form data to the backend.
        add(mapFormModelToFeedbackDTO(data)).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey]);
    const temp = mapFormModelToFeedbackDTO(defaultValues);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FeedbackFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver: resolver as Resolver<FeedbackFormModel, any> // Add the validation resolver with the correct type.
    });

    const selectRole = useCallback((event: SelectChangeEvent<FeedbackSelectEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("Nota", event.target.value as FeedbackSelectEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    const handleCheckboxChange = (value: FeedbackCheckboxEnum[]) => {
        setValue("Likes", value, {
            shouldValidate: true
        });
    };

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectRole,
            handleCheckboxChange
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }
}