import { React } from "react";
import ItemListPage from "@/components/itemList/ItemListPage";
import { items } from "@/lib/item/items";
import { appDomain } from "@/lib/appGlobals";

let metadata;
export default async function Company(props) {
  const params = await props.params;

  const filterKey = decodeURIComponent(params.filterKey);
  const filterValue = decodeURIComponent(params.filterValue);

  metadata = {
    title: `E-Reader List - E-Reader Catalog`,
    metadataBase: new URL(appDomain),
    alternates: {
        canonical: '/categories/' + filterKey + '/' + filterValue,
    }
  };

  return (
    <>
      <ItemListPage
        items={items}
        initialFilters={{ [filterKey]: filterValue }}
      ></ItemListPage>
    </>
  );
}

export { metadata };
