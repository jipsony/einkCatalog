import ItemListPage from "@/components/itemList/ItemListPage";
import { items } from "@/lib/item/items";
import React from "react";

export default function Page() {
  return <ItemListPage items={items}></ItemListPage>
}
