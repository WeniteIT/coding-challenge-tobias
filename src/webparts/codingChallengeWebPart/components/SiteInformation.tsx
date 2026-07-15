/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Stack, Text } from "@fluentui/react";
import { RootState } from "../store/store";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSiteInformation } from "../service/getSiteInformation";
import { setSiteInformation } from "../store/siteInformationSlice";

interface SiteInformationProps {
  context: WebPartContext;
}

export function SiteInformation({
  context,
}: SiteInformationProps): React.ReactElement {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { site } = useSelector((state: RootState) => ({
    site: state.site,
  }));

  React.useEffect(() => {
    (async () => {
      try {
        const site = await getSiteInformation(context);
        dispatch(setSiteInformation(site));
      } catch (error) {
        console.error("Error creating SP instance:", error);
        setError("Failed to load site information");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: "100%" } }}
      >
        <Text variant="medium" styles={{ root: { color: "red" } }}>
          {error}
        </Text>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: "100%" } }}
      >
        <Spinner label="Loading site information..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 5 }} horizontalAlign="center">
      <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
        Site Information
      </Text>
      <Text variant="medium">Title: {site.title || "N/A"}</Text>
      <Text variant="medium">URL: {site.url || "N/A"}</Text>
      <Text variant="medium">
        Site Collection URL: {site.siteCollectionUrl || "N/A"}
      </Text>
      <Text variant="medium">
        Site Collection ID: {site.siteCollectionId || "N/A"}
      </Text>
    </Stack>
  );
}
