import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graphfi, SPFx } from "@pnp/graph";
import "@pnp/graph/users";
import { ProfileState } from "../store/profileSlice";

export async function getMe(context: WebPartContext): Promise<ProfileState> {
  const client = graphfi().using(SPFx(context));
  return client.me.select("displayName,mail,jobTitle,department")();
}
