import ItemAttributeIcons from "@/components/itemCards/ItemAttributeIcons";
import ItemFullInfoCard from "@/components/itemCards/ItemFullInfoCard";
import ItemHorizontalPreviewCard from "@/components/itemCards/ItemHorizontalPreviewCard";
import ItemImageCard from "@/components/itemCards/ItemImageCard";
import ItemMainInfoCard from "@/components/itemCards/ItemMainInfoCard";
import ItemProsAndCons from "@/components/itemCards/ItemProsAndCons";
import ItemTitle from "@/components/itemCards/ItemTitle";
import ItemVerticalPreviewCard from "@/components/itemCards/ItemVerticalPreviewCard";
import BigSectionTitle from "@/components/toolsComponents/BigSectionTitle";
import { itemMainRoute } from "@/lib/appGlobals";
import { items } from "@/lib/item/items";
import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";

export default function ItemFullInfoPage(props) {
  const directionBreakpoint = "md";

  const bigSectionTitleFontSize = "1.5rem";
  const renderSimilarHandhelds = () => {
    return (
      <Box>
        <BigSectionTitle
          // px={{ base: ".4rem", lg: "0" }}
          title={"Similar Devices"}
          mt="1rem"
          // fontSize={{ base: "1.6rem", md: "1.5rem" }}
          // lineBefore={{ base: false, lg: true }}
          fontSize={bigSectionTitleFontSize}
        ></BigSectionTitle>
        <SimpleGrid templateColumns={{ xl: "1fr 1fr" }} gap={"1rem"}>
          {items?.length > 0 &&
            props.itemInfo?.similar?.map((similar) => {
              const similarItemInfo = items.find((row) => row.id === similar);
              return (
                <Box key={"similar:" + similarItemInfo?.id} maxHeight={"6rem"}>
                  <ItemHorizontalPreviewCard
                    itemInfo={similarItemInfo}
                    compareLink={`${itemMainRoute}/compare/${props?.itemInfo?.id}/${similarItemInfo?.id}`}
                  ></ItemHorizontalPreviewCard>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    );
  };
  return (
    <>
      <Stack
        direction={{ base: "column", [directionBreakpoint]: "row" }}
        // fontFamily={"var(--font-roboto-mono), Arial, sans-serif"}
        rowGap={0}
        columnGap={"1rem"}
      >
        <Box minWidth={{ [directionBreakpoint]: "20rem" }}>
          <ItemTitle itemInfo={props?.itemInfo}></ItemTitle>

          <ItemImageCard itemInfo={props?.itemInfo}></ItemImageCard>
          <ItemMainInfoCard itemInfo={props?.itemInfo}></ItemMainInfoCard>
        </Box>
        {/* <Box minWidth={{ [directionBreakpoint]: "20rem" }}>
          <Box>
            <ItemVerticalPreviewCard itemInfo={props?.itemInfo} />
          </Box>
          <ItemMainInfoCard itemInfo={props?.itemInfo}></ItemMainInfoCard>
        </Box> */}
        <Box w="100%">
          <ItemFullInfoCard
            itemInfo={props?.itemInfo}
            isFullPage
            withTitle
          ></ItemFullInfoCard>
          <Box
          // fontSize={"13px"}
          >
            <BigSectionTitle
              // px={{ base: ".4rem", lg: "0" }}
              title={"Pros & Cons"}
              mt="1rem"
              // fontSize={{ base: "1.6rem", md: "1.5rem" }}
              // lineBefore={{ base: false, lg: true }}
              fontSize={bigSectionTitleFontSize}
            ></BigSectionTitle>
            <ItemProsAndCons
              itemInfo={props.itemInfo}
              isFullPage
              directionBreakpoint={directionBreakpoint}
            />
          </Box>
          {renderSimilarHandhelds()}
        </Box>
      </Stack>
    </>
  );
}
