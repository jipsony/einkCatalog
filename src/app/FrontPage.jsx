import ItemHorizontalPreviewCard from "@/components/itemCards/ItemHorizontalPreviewCard";
import ItemVerticalPreviewCard from "@/components/itemCards/ItemVerticalPreviewCard";
import AppLink from "@/components/toolsComponents/AppLink";
import { itemMainRoute } from "@/lib/appGlobals";
import { items } from "@/lib/item/items";
import { Box, Grid, Separator, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";

export default function FrontPage(props) {
  const itemsToShow = [
    "xteink-x4",
    "kindle-colorsoft",
    "kobo-libra-colour",
    // "kindle-scribe-3"
  ]?.map((i) => items?.find((r) => r?.id === i));
  return (
    <Box>
      {itemsToShow?.map((row) => (
        <Stack key={row?.id}>
          <AppLink key={row?.id} href={"/e-readers/" + row?.id}>
            {row?.brand} {row?.name}
          </AppLink>
        </Stack>
      ))}

      <Separator my="2rem"></Separator>

      <SimpleGrid
        templateColumns={{ lg: "1fr 1fr 1fr", md: "1fr 1fr" }}
        gap="1rem"
      >
        {itemsToShow?.map((row) => (
          <Box key={row?.id} minHeight="15rem">
            <ItemVerticalPreviewCard itemInfo={row} />
          </Box>
        ))}
      </SimpleGrid>

      <Separator my="2rem"></Separator>

      {itemsToShow?.map((row) => (
        <Stack key={row?.id} gap="1rem" dir="horizontal">
          <ItemHorizontalPreviewCard
            itemInfo={row}
            compareLink={`${itemMainRoute}/compare/${"xteink-x4"}/${row?.id}`}
          ></ItemHorizontalPreviewCard>
        </Stack>
      ))}
    </Box>
  );
}
