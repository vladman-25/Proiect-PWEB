import { PublisherUpdateFormController, PublisherUpdateFormModel } from "./PublisherUpdateForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePublisherApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { PublisherDTO } from "@infrastructure/apis/client";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: PublisherUpdateFormModel) => {
    const defaultValues = {
        id: "",
        name: "",
        address: "",
        phone: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const mapPublisherDTOToFormModel = (Publisher: PublisherDTO): PublisherUpdateFormModel => { 
    return { id: Publisher?.id ?? '', 
            name: Publisher?.name ?? '', 
            address: Publisher?.address ?? '',
            phone: Publisher?.phone ?? '',
        }; };

/**
 * Create a hook to get the validation schema.
 */
const useInitPublisherUpdateForm = (entry?: PublisherDTO) => {
    const { formatMessage } = useIntl();

    const defaultValues = getDefaultValues(mapPublisherDTOToFormModel(entry ?? {}));

    const schema = yup.object().shape({
        id: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "id"
                }))
            .default(defaultValues.id),
            name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "Name"
                }))
            .default(defaultValues.name),
        address: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "Address"
                }))
            .default(defaultValues.address),
        phone: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "phone"
                }))
            .default(defaultValues.phone),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const usePublisherUpdateFormController = (onSubmit?: () => void, entry?: PublisherDTO ): PublisherUpdateFormController => {
    const { defaultValues, resolver } = useInitPublisherUpdateForm(entry);
    const { updatePublisher: { mutation, key: mutationKey }, getPublishers: { key: queryKey } } = usePublisherApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: PublisherUpdateFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<PublisherUpdateFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
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