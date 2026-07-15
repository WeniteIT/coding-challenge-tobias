/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Stack, Text } from "@fluentui/react";
import { RootState } from "../store/store";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getUserGroupDisplayNames } from "../service/getUserGroups";
import { setUserGroups } from "../store/userGroupSlice";
interface UserGroupsProps {
  context: WebPartContext;
}

export function UserGroups({ context }: UserGroupsProps): React.ReactElement {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { userGroups } = useSelector((state: RootState) => ({
    userGroups: state.userGroups,
  }));

  React.useEffect(() => {
    (async () => {
      try {
        const groups = await getUserGroupDisplayNames(context);
        dispatch(setUserGroups(groups));
      } catch (error) {
        console.error("Error creating SP instance:", error);
        setError("Failed to load user groups");
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
        <Spinner label="Loading user groups..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 5 }} horizontalAlign="center">
      <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
        User Groups
      </Text>
      {userGroups.userGroups && userGroups.userGroups.length > 0 ? (
        userGroups.userGroups.map((group, index) => (
          <Text key={index} variant="medium">
            {group}
          </Text>
        ))
      ) : (
        <Text variant="medium">No User Groups found</Text>
      )}
    </Stack>
  );
}
