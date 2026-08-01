import ItemListPage from "@/components/itemList/ItemListPage";
import { appDomain } from "@/lib/appGlobals";
import { items } from "@/lib/item/items";
import React, { Suspense } from "react";


export const metadata = {
  title: `E-Reader Database - E-Reader Catalog`,
  metadataBase: new URL(appDomain),
  alternates: {
    canonical: "/e-readers",
  },
  description:
    `Browse our database of ${items?.length} e-readers. See and compare full specifications and features. Use our filters to find the perfect e-reader for you, and keep up to date with upcoming and newly released devices.`,
};

export default function Page() {
  return (
    <Suspense>
      <ItemListPage items={items}></ItemListPage>
    </Suspense>
  );
}
