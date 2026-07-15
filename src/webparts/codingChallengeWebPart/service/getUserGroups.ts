import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graphfi, SPFx } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/groups"

export async function getUserGroupDisplayNames(context: WebPartContext): Promise<string[]> {
  const client = graphfi().using(SPFx(context));
  const groups = await client.me.transitiveMemberOf.select("displayName")();
  return groups.map(e => (e as { displayName: string }).displayName);
}
