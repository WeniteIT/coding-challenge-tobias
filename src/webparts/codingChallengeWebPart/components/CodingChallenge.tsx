import * as React from "react";
import { Stack } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Profile } from "./Profile";
import { SiteInformation } from "./SiteInformation";
import { UserGroups } from "./UserGroups";
import { Lists } from "./Lists";

interface CodingChallengeProps {
  context: WebPartContext;
}

export function CodingChallenge({
  context,
}: CodingChallengeProps): React.ReactElement {
  return (
    <Stack
      tokens={{ childrenGap: 16 }}
      verticalAlign="center"
      horizontalAlign="center"
    >
      <Profile context={context} />
      <SiteInformation context={context} />
      <UserGroups context={context} />
      <Lists context={context} />
    </Stack>
  );
}
