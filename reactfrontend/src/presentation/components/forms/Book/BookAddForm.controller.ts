import { BookAddFormController, BookAddFormModel } from "./BookAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBookApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { BookGenreEnum } from "@infrastructure/apis/client";
/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: BookAddFormModel) => {
    const defaultValues = {
        title: "",
        description: "",
        year: 0,
        price: 0.0,
        authorId: "",
        publisherId: "",
        genre: "" as BookGenreEnum
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
const useInitBookAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        title: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "title"
                }))
            .default(defaultValues.title),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "description"
                }))
            .default(defaultValues.description),
        year: yup.number()
            .positive('Must be positive')
            .integer('Must be positive')
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "year"
                }))
            .default(defaultValues.year),
        price: yup.number()
            .positive('Must be positive')
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "price"
                }))
            .default(defaultValues.price),
        authorId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "authorId"
                }))
            .default(defaultValues.authorId),
        publisherId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "publisherId"
                }))
            .default(defaultValues.publisherId),
        genre: yup.string()
            .oneOf([ // The select input should have one of these values.
            BookGenreEnum.Thriller,
            BookGenreEnum.Romance,
            BookGenreEnum.Mystery,
            BookGenreEnum.Fantasy,
            BookGenreEnum.Dystopian,
            BookGenreEnum.Classic,
            BookGenreEnum.Fiction,
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.genre",
                    }),
                }))
            .default(defaultValues.genre)
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useBookAddFormController = (onSubmit?: () => void): BookAddFormController => {
    const { defaultValues, resolver } = useInitBookAddForm();
    const { addBook: { mutation, key: mutationKey }, getBooks: { key: queryKey } } = useBookApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: BookAddFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<BookAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectGenre = useCallback((event: SelectChangeEvent<BookGenreEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("genre", event.target.value as BookGenreEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectGenre
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