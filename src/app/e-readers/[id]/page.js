import React from "react";

import { getItemInfo } from "@/lib/item/items";
import ItemTitleCard from "@/components/itemCards/ItemTitleCard";
import ItemInfoPage from "./ItemInfoPage";

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  const itemInfo = getItemInfo(id);
  return (
    <div>
      <ItemInfoPage itemInfo={itemInfo}></ItemInfoPage>
    </div>
  );
}
