import React from "react";

import { getItemInfo } from "@/lib/item/items";
import ItemTitleCard from "@/components/itemCards/ItemTitleCard";
import ItemFullInfoPage from "./ItemFullInfoPage";

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  const itemInfo = getItemInfo(id);
  return (
    <div>
      <ItemFullInfoPage itemInfo={itemInfo}></ItemFullInfoPage>
    </div>
  );
}
