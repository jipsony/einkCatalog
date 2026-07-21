import { React } from "react";
import ItemListPage from "@/components/itemList/ItemListPage";
import { items } from "@/lib/item/items";

let metadata;
export default async function Company(props) {
  const params = await props.params;

  const filterKey = decodeURIComponent(params.filterKey);
  const filterValue = decodeURIComponent(params.filterValue);

  metadata = {
    // title: `Handheld List - Retro Catalog`,
    // metadataBase: new URL('https://retrocatalog.com'),
    // alternates: {
    //     canonical: '/retro-handhelds/categories/' + filterKey + '/' + filterValue,
    // }
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
