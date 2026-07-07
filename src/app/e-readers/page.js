import ItemListPage from "@/components/itemList/ItemListPage";
import { items } from "@/lib/item/items";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <ItemListPage items={items}></ItemListPage>
    </Suspense>
  );
}
