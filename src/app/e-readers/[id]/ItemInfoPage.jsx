import ItemFullInfoCard from "@/components/itemCards/ItemFullInfoCard";
import ItemImageCard from "@/components/itemCards/ItemImageCard";
import ItemMainInfoCard from "@/components/itemCards/ItemMainInfoCard";
import ItemTitleCard from "@/components/itemCards/ItemTitleCard";
import { Box, Stack } from "@chakra-ui/react";
import React from "react";

export default function ItemInfoPage(props) {
  const directionBreakpoint = "md";

  return (
    <>
      <ItemTitleCard itemInfo={props?.itemInfo}></ItemTitleCard>
      <Stack
        direction={{ base: "column", [directionBreakpoint]: "row" }}
        fontFamily={"var(--font-roboto-mono), Arial, sans-serif"}
      >
        <Box minWidth={{ [directionBreakpoint]: "18rem" }}>
          <ItemImageCard itemInfo={props?.itemInfo}></ItemImageCard>
          <ItemMainInfoCard itemInfo={props?.itemInfo}></ItemMainInfoCard>
        </Box>
        <Box w="100%">
          <ItemFullInfoCard
            itemInfo={props?.itemInfo}
            isFullPage
          ></ItemFullInfoCard>
        </Box>
      </Stack>
    </>
  );
}
