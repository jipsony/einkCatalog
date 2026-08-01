import React from "react";

import { getItemInfo } from "@/lib/item/items";
import ItemFullInfoPage from "./ItemFullInfoPage";
import AppBreadcrumbs from "@/components/toolsComponents/AppBreadcrumbs";
import { buildFullName, individualItemLabel, itemMainRoute, itemsLabel } from "@/lib/appGlobals";

let metadata;
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const itemInfo = getItemInfo(id);

  metadata = {
    title: `${itemInfo.fullName} ${individualItemLabel} Full Specifications and List of Features`,
    // description: `${generateDescription()}`,
    alternates: {
      canonical:  + itemInfo.id,
    },
  };

  return (
    <div>
      <AppBreadcrumbs
        breadcrumbList={[
          {
            label: itemsLabel,
            path: itemMainRoute,
          },
          // {
          //   label: `${props.itemInfo.company}`,
          //   path: `/companies/${props.itemInfo.company}`,
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


export {metadata}