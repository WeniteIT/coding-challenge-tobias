/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Stack, Text } from "@fluentui/react";
import { RootState } from "../store/store";
import { setProfile } from "../store/profileSlice";
import { getMe } from "../service/getMe";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getCurrentUser } from "../service/getCurrentUser";

interface ProfileProps {
  context: WebPartContext;
}

export function Profile({ context }: ProfileProps): React.ReactElement {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { profile } = useSelector((state: RootState) => ({
    profile: state.profile,
  }));

  React.useEffect(() => {
    (async () => {
      try {
        const [me, me2] = await Promise.all([
          getMe(context),
          getCurrentUser(context),
        ]);
        dispatch(setProfile({ ...me, displayNameSP: me2.Title }));
      } catch (error) {
        console.error("Error creating SP instance:", error);
        setError("Failed to load profile");
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
        <Spinner label="Loading profile..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 5 }} horizontalAlign="center">
      <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
        Profile
      </Text>
      <Text variant="medium">Name(Graph): {profile.displayName || "N/A"}</Text>
      <Text variant="medium">Name(sp): {profile.displayNameSP || "N/A"}</Text>
      <Text variant="medium">Mail: {profile.mail || "N/A"}</Text>
      <Text variant="medium">Job Title: {profile.jobTitle || "N/A"}</Text>
      <Text variant="medium">Department: {profile.department || "N/A"}</Text>
    </Stack>
  );
}
