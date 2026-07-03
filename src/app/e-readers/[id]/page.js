import React from "react";

import { getItemInfo } from "@/lib/item/items";
import ItemFullInfoPage from "./ItemFullInfoPage";
import Sandbox from "@/components/Sandbox";
import AppBreadcrumbs from "@/components/toolsComponents/AppBreadcrumbs";
import { buildFullName, itemMainRoute, itemsLabel } from "@/lib/appGlobals";

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  const itemInfo = getItemInfo(id);
  return (
    <div>
      <AppBreadcrumbs
        breadcrumbList={[
          {
            label: itemsLabel,
            path: itemMainRoute,
          },
          // {
          //   label: `${props.handheldInfo.company}`,
          //   path: `/companies/${props.handheldInfo.company}`,
          // },
          {
            label: `${buildFullName(itemInfo)} Specs`,
            path: `${itemMainRoute}/${itemInfo?.id}`,
            isCurrentPage: true,
          },
        ]}
      ></AppBreadcrumbs>
      <ItemFullInfoPage itemInfo={itemInfo}></ItemFullInfoPage>
    </div>
  );
}
