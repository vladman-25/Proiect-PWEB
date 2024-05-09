import { RegisterFormController, RegisterFormModel } from "./RegisterForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRegisterApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useAppDispatch } from "@application/store";
import { setToken } from "@application/state-slices";
import { toast } from "react-toastify";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: { email: string }) => {
    const defaultValues = {
        email: "",
        name: "",
        password: ""
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
const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({ // Use yup to build the validation schema of the form.
        email: yup.string() // This field should be a string.
            .required(formatMessage( // Use formatMessage to get the translated error message.
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({ // Format the message with other translated strings.
                        id: "globals.email",
                    }),
                })) // The field is required and needs a error message when it is empty.
            .email() // This requires the field to have a email format.
            .default(defaultValues.email), // Add a default value for the field.
        name: yup.string() // This field should be a string.
            .required(formatMessage( // Use formatMessage to get the translated error message.
                { id: "globals.validations.requiredField" },
                {
                    fieldName: "name",
                })) // The field is required and needs a error message when it is empty.
            .default(defaultValues.name), // Add a default value for the field.
        password: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                }))
            .default(defaultValues.password),
    });

    const resolver = yupResolver(schema); // Get the resolver.

    return { defaultValues, resolver }; // Return the default values and the resolver.
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useRegisterFormController = (): RegisterFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { redirectToHome } = useAppRouter();
    const { registerMutation: { mutation, key: mutationKey } } = useRegisterApi();
    const { mutateAsync: Register, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation
    })
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const submit = useCallback((data: RegisterFormModel) => // Create a submit callback to send the form data to the backend.
        Register(data).then((result) => {
            dispatch(setToken(result.response?.token ?? ''));
            toast(formatMessage({ id: "notifications.messages.authenticationSuccess" }));
            redirectToHome();
        }), [Register, queryClient, redirectToHome, dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register // Add the variable register to bind the form fields in the UI with the form variables.
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