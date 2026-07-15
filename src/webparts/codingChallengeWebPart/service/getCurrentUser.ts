import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFx } from "@pnp/sp";
import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

export async function getCurrentUser(
  context: WebPartContext
): Promise<ISiteUserInfo> {
  const sp = spfi().using(SPFx(context));
  const currentUser = await sp.web.currentUser.select("Title")();
  return currentUser;
}
