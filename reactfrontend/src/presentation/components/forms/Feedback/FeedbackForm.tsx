import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    MenuItem,
    Select,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useFeedbackFormController } from "./FeedbackForm.controller";
import { isEmpty, isUndefined } from "lodash";

/**
 * Here we declare the Publisher add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const FeedbackForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useFeedbackFormController(props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.Descriere)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                Describe your experience
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <OutlinedInput
                                {...actions.register("Descriere")} // Bind the form variable to the UI input.
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: "Descriere",
                                    })}
                                autoComplete="none"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.Descriere)}
                            >
                                {state.errors.Descriere?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.Experienta)}
                        >
                            <FormLabel required>
                            Was it positive?
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Positve" />
                                <FormControlLabel value={0} control={<Radio />} label="Negative" />
                            </RadioGroup>
                            <FormHelperText
                                hidden={isUndefined(state.errors.Experienta)}
                            >
                                {state.errors.Experienta?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.Nota)}
                        >
                            <FormLabel required>
                            Give us a rating
                            </FormLabel>
                            <Select
                                {...actions.register("Nota")}
                                value={actions.watch("Nota")}
                                onChange={actions.selectRole} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value={"Nota1"}>1</MenuItem>
                                <MenuItem value={"Nota2"}>2</MenuItem>
                                <MenuItem value={"Nota3"}>3</MenuItem>
                                <MenuItem value={"Nota4"}>4</MenuItem>
                                <MenuItem value={"Nota5"}>5</MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.Nota)}
                            >
                                {state.errors.Nota?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.Likes)}
                        >
                            <FormLabel required>
                            What did you like
                            </FormLabel>
                            <FormControlLabel control={<Checkbox />} label="Speed" />
                            <FormControlLabel control={<Checkbox />} label="Responsive" />
                            <FormControlLabel control={<Checkbox />} label="Accessible" />
                            <FormControlLabel control={<Checkbox />} label="WebPages" />
                            <FormHelperText
                                hidden={isUndefined(state.errors.Likes)}
                            >
                                {state.errors.Likes?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    </form>
};