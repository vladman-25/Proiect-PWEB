import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { AddressTable } from "@presentation/components/ui/Tables/AddressTable";

export const AddresssPage = memo(() => {
  return <Fragment>
    <Seo title="MobyLab Web App | Addresss" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <AddressTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});