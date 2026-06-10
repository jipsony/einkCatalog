import { React } from "react";
import { Box } from "@chakra-ui/react";
import ComparePage from "./ComparePage";
import { appName, appDomain, itemRoute, items } from "@/lib/appGlobals";
 
export async function generateMetadata({ params, searchParams }, parent) {
  const defaultMetadata = {
  title: `${items} Comparison - ${appName}`,
  metadataBase: new URL(`${appDomain}`),
    alternates: {
    canonical: `${itemRoute}/compare`,
    },
  description: `Compare features and specifications of ${items.toLowerCase()}, and visualize the size difference between devices`
  };
  const compareString = (await searchParams).compare

  if (!compareString) return defaultMetadata;
  const compare = JSON.parse(compareString);

  if (!compare.compare || !compare.with) return {
    ...defaultMetadata,
    robots: {
      index: false
    }
  }

  return defaultMetadata;
}

export default async function Page({ params, searchParams }) {

  return (
    <>
        <Box mt={"1rem"}>
          <ComparePage></ComparePage>
        </Box>
    </>
  );
}
