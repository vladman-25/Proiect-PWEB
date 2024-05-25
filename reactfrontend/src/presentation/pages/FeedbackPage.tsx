import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { FeedbackForm } from "@presentation/components/forms/Feedback/FeedbackForm";

export const FeedbackPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Feedback" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <FeedbackForm />
            </Box>
        </WebsiteLayout>
    </Fragment>
});