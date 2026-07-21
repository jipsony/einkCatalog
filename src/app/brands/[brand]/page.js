import ItemListPage from "@/components/itemList/ItemListPage";
import { items } from "@/lib/item/items";
import { React } from "react";

let metadata;
export default async function Company({ params }) {
  const brand = params.brand.replace("%20", " ");

  metadata = {
    title: `${brand} E-Readers List - Retro Catalog`,
    description: `Browse the features, specs and performance of all devices releaesd by ${brand}`,
    // metadataBase: new URL('https://retrocatalog.com'),
    alternates: {
      canonical: "/e-readers/brands/" + brand,
    },
  };

  return (
    <>
        <ItemListPage items={items} initialFilters={{ brand }}></ItemListPage>
    </>
  );
}

export { metadata };
