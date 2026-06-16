import React from "react";
import { Box } from "@chakra-ui/react";

import ComparePage from "../../ComparePage";
import { appName, appDomain, itemRoute, itemsLabel } from "@/lib/appGlobals";
import { itemsSearchList } from "@/lib/item/itemSearchList";

const getFullNameFromSearchList = (id) => {
  return (
    itemsSearchList?.unsorted?.find((row) => row.id === id)?.fullName ?? null
  );
};

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const compareName = getFullNameFromSearchList(params.compare);
  const compareWithName = getFullNameFromSearchList(params.with);

  const defaultMetadata = {
    title:
      compareName && compareWithName
        ? `${compareName} vs. ${compareWithName} Comparison - ${appName}`
        : `${itemsLabel} Comparison - ${appName}`,
    description:
      compareName && compareWithName
        ? `Compare features and specifications of ${compareName} vs. ${compareWithName}, and visualize the size difference between devices`
        : `Compare features and specifications of ${itemsLabel.toLowerCase()}, and visualize the size difference between devices`,
    metadataBase: new URL(`${appDomain}`),
    alternates: {
      canonical: `${itemRoute}/compare/${params.compare}/${params.with}`,
    },
  };

  if (!compareName || !compareWithName) {
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
        <ComparePage compare={params.compare} with={params.with}></ComparePage>
      </Box>
    </>
  );
}
