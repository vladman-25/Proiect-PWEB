import { AuthorUpdateFormController, AuthorUpdateFormModel } from "./AuthorUpdateForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthorApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { AuthorDTO } from "@infrastructure/apis/client";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: AuthorUpdateFormModel) => {
    const defaultValues = {
        id: "",
        name: "",
        surname: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const mapAuthorDTOToFormModel = (author: AuthorDTO): AuthorUpdateFormModel => { 
    return { id: author?.id ?? '', 
            name: author?.name ?? '', 
            surname: author?.surname ?? '',
        }; };

/**
 * Create a hook to get the validation schema.
 */
const useInitAuthorUpdateForm = (entry?: AuthorDTO) => {
    const { formatMessage } = useIntl();

    const defaultValues = getDefaultValues(mapAuthorDTOToFormModel(entry ?? {}));

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
                    fieldName: "name"
                }))
            .default(defaultValues.name),
        surname: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "surname"
                }))
            .default(defaultValues.surname),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useAuthorUpdateFormController = (onSubmit?: () => void, entry?: AuthorDTO ): AuthorUpdateFormController => {
    const { defaultValues, resolver } = useInitAuthorUpdateForm(entry);
    const { updateAuthor: { mutation, key: mutationKey }, getAuthors: { key: queryKey } } = useAuthorApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: AuthorUpdateFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<AuthorUpdateFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
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