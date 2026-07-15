import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFx } from "@pnp/sp";
import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { IListInfo } from "@pnp/sp/lists";

export async function getLists(context: WebPartContext): Promise<IListInfo[]> {
  const sp = spfi().using(SPFx(context));

  const lists = await sp.web.lists.select(
    "Title, Id, BaseTemplate, ItemCount, description, RootFolder/ServerRelativeUrl"
  ).expand("RootFolder")();

  return lists;
}
