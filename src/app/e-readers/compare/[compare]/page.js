import React from "react";
import { Box } from "@chakra-ui/react";

import ComparePage from "../ComparePage";
import { appName, appDomain, itemMainRoute, itemsLabel } from "@/lib/appGlobals";
import { itemsSearchList } from "@/lib/item/itemSearchList";

const getFullNameFromSearchList = (id) => {
  return (
    itemsSearchList?.unsorted?.find((row) => row.id === id)?.fullName ?? null
  );
};

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const compareName = getFullNameFromSearchList(params.compare);

  const defaultMetadata = {
    title: compareName
      ? `${compareName} Comparison - ${appName}`
      : `${itemsLabel} Comparison - ${appName}`,
    metadataBase: new URL(`${appDomain}`),
    alternates: {
      canonical: `${itemMainRoute}/compare/${params.compare}`,
    },
    description: compareName
      ? `Compare features and specifications of ${compareName}, and visualize the size difference between devices`
      : `Compare features and specifications of ${itemsLabel.toLowerCase()}, and visualize the size difference between devices`,
  };

  if (!compareName) {
    return {
      ...defaultMetadata,
      robots: {
        index: false,
      },
    };
  }

  return defaultMetadata;
}

export default async function Page(props) {
  const params = await props.params;

  return (
    <>
      <Box mt={"1rem"}>
        <ComparePage compare={params.compare}></ComparePage>
      </Box>
    </>
  );
}
