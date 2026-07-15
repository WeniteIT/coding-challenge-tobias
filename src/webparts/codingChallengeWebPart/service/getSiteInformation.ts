import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFx } from "@pnp/sp";
import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import { SiteInformation } from "../store/siteInformationSlice";

export async function getSiteInformation(
  context: WebPartContext
): Promise<SiteInformation> {
  const sp = spfi().using(SPFx(context));
  const site = await sp.site();

  const infos = await sp.web();
  return {
    title: infos.Title,
    url: infos.Url,
    siteCollectionUrl: site.Url,
    siteCollectionId: site.Id,
  };
}
