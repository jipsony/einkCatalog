import { React, Suspense } from "react";
import ItemListPage from "@/components/itemList/ItemListPage";
import { items } from "@/lib/item/items";

let metadata;

export default async function Company(props) {
  const params = await props.params;
  let filterKey = decodeURIComponent(params.filterKey);

  if (filterKey?.startsWith("with-")) {
    filterKey = filterKey?.split("with-")?.[1];
  }

  metadata = {
    // title: `Handheld List - Retro Catalog`,
    // metadataBase: new URL("https://retrocatalog.com"),
    // alternates: {
    //   canonical: "/retro-handhelds/categories/" + filterKey,
    // },
  };

  return (
    <Suspense>
      <ItemListPage items={items} initialFilters={{ [filterKey]: true }} />
    </Suspense>
  );
}

export { metadata };
